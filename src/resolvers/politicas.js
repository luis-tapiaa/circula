const bibliotecas = require("./loaders/bibliotecas");
const grupos_usuario = require("./loaders/grupos_usuario");
const tipos_item = require("./loaders/tipos_item");

const resolvers = {
  Query: {
    politicas: (_, args, { db }) => db.any("SELECT * FROM politicas"),
  },
  Mutation: {
    addPolitica: (_, { input }, { db }) =>
      db.one(
        "INSERT INTO politicas(${this:name}) VALUES(${this:csv}) RETURNING *",
        input
      ),
    updatePolitica: (_, { input, id }, { db, update }) =>
      db
        .one(update(input, null, "politicas") + " WHERE id=$1 RETURNING *", id)
        .then((res) => res),
    dropPolitica: (_, { id }, { db }) =>
      db
        .result("DELETE FROM politicas WHERE id=$1", id)
        .then((res) => res.rowCount),
  },
  Politica: {
    biblioteca: (_) => {
      if (_.biblioteca_id) {
        return bibliotecas.load(_.biblioteca_id);
      } else {
        return null;
      }
    },
    grupo_usuario: (_) => {
      if (_.grupo_usuario_id) {
        return grupos_usuario.load(_.grupo_usuario_id);
      } else {
        return null;
      }
    },
    tipo_item: (_) => {
      if (_.tipo_item_id) {
        return tipos_item.load(_.tipo_item_id);
      } else {
        return null;
      }
    },
  },
};

module.exports = resolvers;
