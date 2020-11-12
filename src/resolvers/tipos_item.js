const resolvers = {
  Query: {
    tiposItem: (_, args, { db }) => db.any("SELECT * FROM tipos_item"),
  },
  Mutation: {
    addTipoItem: (_, { input }, { db }) =>
      db.one(
        "INSERT INTO tipos_item(${this:name}) VALUES(${this:csv}) RETURNING *",
        input
      ),
    updateTipoItem: (_, { id, input }, { db, update }) =>
      db.one(
        update(input, null, "tipos_item") + " WHERE id=$1 RETURNING *",
        id
      ),
    dropTipoItem: (_, { id }, { db }) =>
      db
        .result("DELETE FROM tipos_item WHERE id=$1", id)
        .then((res) => res.rowCount),
  },
};

module.exports = resolvers;
