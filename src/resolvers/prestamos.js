const items = require("./loaders/items");

const resolvers = {
    Query: {
      prestamo: (_, { codigo }, { db }) => null,
    },
    Mutation: {
      addPrestamo: (_, { input }, { db }) =>
        db.one(
          "INSERT INTO prestamos(${this:name}) VALUES(${this:csv}) RETURNING *",
          input
        ),
      updatePrestamo: (_, { input, id }, { db, update }) =>
        db
          .one(update(input, null, "prestamos") + " WHERE id=$1 RETURNING *", id)
          .then((res) => res),
      dropPrestamo: (_, { id }, { db }) =>
        db
          .result("DELETE FROM prestamos WHERE id=$1", id)
          .then((res) => res.rowCount),
    },
    Prestamo: {
      item: (_) => {
        if (_.item_id) {
          return items.load(_.item_id);
        } else {
          return null;
        }
      }
    },
  };
  
  module.exports = resolvers;
  