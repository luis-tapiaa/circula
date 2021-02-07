const {ApolloError} = require("apollo-server");

const resolvers = {
  Query: {
    registros: (_, { input }, { db }) => {
      const { limit = 5, offset = 0, filter = "", sort = "" } = input || {};
      
      return db.any("SELECT * FROM registros_bib " + filter + " " + sort
          + " LIMIT $1 OFFSET $2", [limit, offset]).then(res => {
            if(!res.length) {
              throw new ApolloError("No hay mas datos.");
            }
            return res;
          });
    },
    registro: (_, { id }, { db }) =>
      db.one("SELECT * FROM registros_bib WHERE id=$1", id),
  },
  Mutation: {
    createRegistro: (_, { input }, { db }) =>
      db.one("INSERT INTO registros_bib(${this:name}) VALUES(${this:csv}) RETURNING *", input),
    updateRegistro: (_, { id, input }, { db, update }) =>
      db.one(update(input, null, "registros_bib") + " WHERE id=$1 RETURNING *", id),
    deleteRegistro: (_, { id }, { db }) =>
      db.one("DELETE FROM registros_bib WHERE id=$1 RETURNING id", id)
  },
  Registro: {
    items: (_, args, { db }) =>
      db.any("SELECT * FROM items WHERE registro_bib_id=$1", _.id),
  },
};

module.exports = resolvers;
