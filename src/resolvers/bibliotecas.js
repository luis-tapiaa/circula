const resolvers = {
  Query: {
    bibliotecas: (_, args, { db }) => db.any("SELECT * FROM bibliotecas"),
  },
  Mutation: {
    addBiblioteca: (_, { input }, { db }) =>
      db.one(
        "INSERT INTO bibliotecas(${this:name}) VALUES(${this:csv}) RETURNING *",
        input
      ),
    updateBiblioteca: (_, { id, input }, { db, update }) =>
      db.one(
        update(input, null, "bibliotecas") + " WHERE id=$1 RETURNING *",
        id
      ),
    dropBiblioteca: (_, { id }, { db }) =>
      db
        .result("DELETE FROM bibliotecas WHERE id=$1", id)
        .then((res) => res.rowCount),
  },
};

module.exports = resolvers;
