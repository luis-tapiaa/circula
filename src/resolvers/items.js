const bibliotecas = require("./loaders/bibliotecas");

const resolvers = {
  Query: {
    item: (_, { codigo }, { db }) =>
      db.one("SELECT * FROM items WHERE codigo=$1", codigo),
  },
  Mutation: {
    addItem: (_, { input }, { db }) =>
      db.one(
        "INSERT INTO items(${this:name}) VALUES(${this:csv}) RETURNING *",
        input
      ),
    updateItem: (_, { id, input }, { db, update }) =>
      db.one(update(input, null, "items") + " WHERE id=$1 RETURNING *", id),
    dropItem: (_, { id }, { db }) =>
      db
        .result("DELETE FROM items WHERE id=$1", id)
        .then((res) => res.rowCount),
  },
  Item: {
    biblioteca: (_) => bibliotecas.load(_.biblioteca_id),
  },
};

module.exports = resolvers;
