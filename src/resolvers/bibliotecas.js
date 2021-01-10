const resolvers = {
  Query: {
    bibliotecas: (_, args, { db }) => db.any("SELECT * FROM bibliotecas"),
  },
  Mutation: {
    createBiblioteca: (_, { input }, { db }) =>
      db.one("INSERT INTO bibliotecas(${this:name}) VALUES(${this:csv}) RETURNING *", input),
    updateBiblioteca: (_, { id, input }, { db, update }) =>
      db.one(update(input, null, "bibliotecas") + " WHERE id=$1 RETURNING *", id),
    deleteBiblioteca: (_, { id }, { db }) =>
      db.one("DELETE FROM bibliotecas WHERE id=$1 RETURNING id", id)
  },
};

module.exports = resolvers;
