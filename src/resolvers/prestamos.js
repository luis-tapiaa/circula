const items = require("./loaders/items");

const resolvers = {
  Query: {
    prestamo: (_, { codigo }, { db }) => null,
  },
  Mutation: {
    createPrestamo: (_, { input }, { db }) =>
      db.one("INSERT INTO prestamos(${this:name}) VALUES(${this:csv}) RETURNING *", input),
    updatePrestamo: (_, { input, id }, { db, update }) =>
      db.one(update(input, null, "prestamos") + " WHERE id=$1 RETURNING *", id),
    deletePrestamo: (_, { id }, { db }) =>
      db.result("DELETE FROM prestamos WHERE id=$1", id)
        .then(res => res.rowCount),
  },
  Prestamo: {
    item: ({ item_id }) => (item_id ? items.load(item_id) : null),
  },
};

module.exports = resolvers;
