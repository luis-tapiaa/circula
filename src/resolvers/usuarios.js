require("dotenv").config();
const jwt = require("jsonwebtoken");
const bibliotecas = require("./loaders/bibliotecas");
const grupos_usuario = require("./loaders/grupos_usuario");
const { cloudinary } = require('../utils/cloudinary');

const uploadImage = async(foto)=> {
  const data = await cloudinary.uploader.upload(foto,{
    upload_preset: 'devs'
  });
  return data.url;
}

const deleteImage = async(imgUrl) =>{
  let exp_reg = /[/]+[A-Za-z0-9]*.(jpg)$/g;
    let respuesta = imgUrl.match(exp_reg)
    const id_cloudinary = respuesta[0].substring(1,respuesta[0].length-4);
    const cloudinary_id = `dev_setups/${id_cloudinary}`;
    await cloudinary.uploader.destroy(cloudinary_id)
        .then( respuesta => {
            console.log(respuesta);
        }).catch(err =>{
            console.log(err);
    });
}

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
      
      return db.any("SELECT * FROM usuarios " + filter + " " + sort
        + " LIMIT $1 OFFSET $2", [limit, offset]);
    },
    usuario: (_, { id, codigo }, { db }) =>
      db.one("SELECT * FROM usuarios WHERE id=$1 OR codigo=$2", [id, codigo]),
  },
  Mutation: {
    createUsuario: async(_, { input }, { db }) => {
      const { direcciones, foto, ...user} = input;
      let photoURL = '';
      if(foto){
        const dataUrl = await uploadImage(foto);
        console.log(dataUrl);
        photoURL = dataUrl;
      }
      return db.tx(t => {
        return db.one("INSERT INTO usuarios(${this:name}) VALUES(${this:csv}) RETURNING *", foto ? user : {...user,foto: photoURL})
          .then(usuario => {
            if(direcciones) {
              direcciones.forEach(dir => {
                db.none("INSERT INTO direcciones(${this:name}) VALUES(${this:csv})", { ...dir, usuario_id: usuario.id });
              });
	    }
            return t.batch([usuario]);
          });
      }).then(res => res[0]);
    },
    updateUsuario: (_, { id, input }, { db, update }) => {
      const { direcciones, foto, ...user} = input;
      const imgUrl = db.oneOrNone("SELECT foto FROM usuarios WHERE id=$1", [id]);
      if(imgUrl){
        deleteImage(imgUrl);
      }
      return db.one(update(user, null, "usuarios") + " WHERE id=$1 RETURNING *", id)
        .then(usuario => {
          if(direcciones) {
            db.none("DELETE FROM direcciones WHERE usuario_id=$1", id)
              .then(() => {
                direcciones.forEach(dir => {
                  db.none("INSERT INTO direcciones(${this:name}) VALUES(${this:csv})", { ...dir, usuario_id: id });
                });
              });
          }

          return usuario;
        });
    },
    deleteUsuario: (_, { id }, { db }) => {
      const imgUrl = db.oneOrNone("SELECT foto FROM usuarios WHERE id=$1", [id]);
      deleteImage(imgUrl);
	return db.none("DELETE FROM direcciones WHERE usuario_id=$1", id)
          .then(() =>
            db.one("DELETE FROM usuarios WHERE id=$1 RETURNING id", id)
          );
    }
  },
  Usuario: {
    biblioteca: (_) => bibliotecas.load(_.biblioteca_id),
    grupo_usuario: (_) => grupos_usuario.load(_.grupo_usuario_id),
    foto: (_, args, { db }) =>
      db.oneOrNone("SELECT encode(img, 'base64') FROM usuarios_imagen WHERE usuario_id=$1", _.id)
        .then(res => {
          if (res) return res.encode;
          return null;
        }),
    direcciones: (_, args, { db }) =>
      db.any("SELECT * FROM direcciones WHERE usuario_id =$1", _.id),
    prestamos: (_, args, { db }) =>
      db.any("SELECT * FROM prestamos WHERE usuario_id =$1", _.id),
    cuentas: (_, args, { db }) =>
      db.any("SELECT * FROM cuentas WHERE usuario_id =$1", _.id),
  },
};

module.exports = resolvers;
