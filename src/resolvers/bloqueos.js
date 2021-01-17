const resolvers = {
  Mutation: {
    createBloqueo: (_, { input }, { db }) =>
      db.one("INSERT INTO bloqueos(${this:name}) VALUES(${this:csv}) RETURNING *", input),
    updateBloqueo: (_, { id, input }, { db, update }) =>
      db.one(update(input, null, "bloqueos") + " WHERE id=$1 RETURNING *", id),
    deleteBloqueo: (_, { id }, { db }) =>
      db.one("DELETE FROM bloqueos WHERE id=$1 RETURNING id", id)
  },
};

module.exports = resolvers;
