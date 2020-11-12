const bibliotecas = require("./loaders/bibliotecas");

const resolvers = {
  Query: {
    gruposUsuario: (_, args, { db }) => db.any("SELECT * FROM grupos_usuario"),
  },
  Mutation: {
    addGrupoUsuario: (_, { input }, { db }) =>
      db.one(
        "INSERT INTO grupos_usuario(${this:name}) VALUES(${this:csv}) RETURNING *",
        input
      ),
    updateGrupoUsuario: (_, { input, id }, { db, update }) =>
      db
        .one(
          update(input, null, "grupos_usuario") + " WHERE id=$1 RETURNING *",
          id
        )
        .then((res) => res),
    dropGrupoUsuario: (_, { id }, { db }) =>
      db
        .result("DELETE FROM grupos_usuario WHERE id=$1", id)
        .then((res) => res.rowCount),
  },
  GrupoUsuario: {
    biblioteca: (_) => {
      if (_.biblioteca_id) {
        return bibliotecas.load(_.biblioteca_id);
      } else {
        return null;
      }
    },
  },
};

module.exports = resolvers;
