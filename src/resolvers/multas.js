const bibliotecas = require("./loaders/bibliotecas");

const resolvers = {
  Query: {
    multas: (_, args, { db }) => db.any("SELECT * FROM multas"),
  },
  Mutation: {
    createMulta: (_, { input }, { db }) =>
      db.one("INSERT INTO multas(${this:name}) VALUES(${this:csv}) RETURNING *", input),
    updateMulta: (_, { input, id }, { db, update }) =>
      db.one(update(input, null, "multas") + " WHERE id=$1 RETURNING *", id),
    deleteMulta: (_, { id }, { db }) =>
      db.result("DELETE FROM multas WHERE id=$1", id)
        .then(res => res.rowCount),
  },
  Multa: {
    biblioteca: ({ biblioteca_id }) =>
      biblioteca_id ? bibliotecas.load(biblioteca_id) : null,
  },
};

module.exports = resolvers;
