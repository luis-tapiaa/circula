require("dotenv").config();
const jwt = require("jsonwebtoken");
const bibliotecas = require("./loaders/bibliotecas");
const grupos_usuario = require("./loaders/grupos_usuario");

const resolvers = {
  Query: {
    login: async (_, { usuario, password }, { db }) => {
      return db
        .one("SELECT * FROM usuarios WHERE usuario=$1 AND password=$2", [usuario, password])
        .then(res => {
          const token = jwt.sign(
            { id: res.id, codgo: res.codigo },
            process.env.TOKEN_KEY,
            { expiresIn: process.env.DURATION }
          );
          return { token, usuario: res };
        });
    }, 
    verificar: (_, { token }, { db }) => {
      const { id } = jwt.verify(token, process.env.TOKEN_KEY);
      return db.one("SELECT * FROM usuarios WHERE id=$1", [id]);
    },
    usuarios: (_, { input }, { db }) => {
      const { limit = 5, offset = 0, filter = "", sort = "" } = input || {};
      
      return {
        usuarios: db.any("SELECT * FROM usuarios " + filter + " " + sort
          + " LIMIT $1 OFFSET $2", [limit, offset]),
        total: db.one("SELECT COUNT(*) AS total FROM usuarios " + filter)
          .then(res => parseInt(res.total, 10))
      };
    },
    usuario: (_, { id, codigo }, { db }) =>
      db.one("SELECT * FROM usuarios WHERE id=$1 OR codigo=$2", [id, codigo]),
  },
  Mutation: {
    createUsuario: (_, { input }, { db }) =>
      db.one("INSERT INTO usuarios(${this:name}) VALUES(${this:csv}) RETURNING *", input),
    updateUsuario: (_, { id, input }, { db, update }) =>
      db.one(update(input, null, "usuarios") + " WHERE id=$1 RETURNING *", id),
    deleteUsuario: (_, { id }, { db }) =>
      db.result("DELETE FROM usuarios WHERE id=$1", id)
        .then((res) => res.rowCount),
  },
  Usuario: {
    biblioteca: (_) => bibliotecas.load(_.biblioteca_id),
    grupo_usuario: (_) => grupos_usuario.load(_.grupo_usuario_id),
    foto: (_, args, { db }) =>
      db.one("SELECT encode(img, 'base64') FROM usuarios_imagen WHERE usuario_id=$1", _.id)
        .then(res => res.encode),
    direcciones: (_, args, { db }) =>
      db.any("SELECT * FROM direcciones WHERE usuario_id =$1", _.id),
    prestamos: (_, args, { db }) =>
      db.any("SELECT * FROM prestamos WHERE usuario_id =$1", _.id),
    cuentas: (_, args, { db }) =>
      db.any("SELECT * FROM cuentas WHERE usuario_id =$1", _.id),
  },
};

module.exports = resolvers;
