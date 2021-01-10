const resolvers = {
  Query: {
    tiposItem: (_, args, { db }) => db.any("SELECT * FROM tipos_item"),
  },
  Mutation: {
    createTipoItem: (_, { input }, { db }) =>
      db.one("INSERT INTO tipos_item(${this:name}) VALUES(${this:csv}) RETURNING *", input),
    updateTipoItem: (_, { id, input }, { db, update }) =>
      db.one(update(input, null, "tipos_item") + " WHERE id=$1 RETURNING *", id),
    deleteTipoItem: (_, { id }, { db }) =>
      db.one("DELETE FROM tipos_item WHERE id=$1 RETURNING id", id)
  },
};

module.exports = resolvers;
