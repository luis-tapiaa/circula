const bibliotecas = require("./loaders/bibliotecas");

const resolvers = {
  Query: {
    item: (_, { codigo }, { db }) =>
      db.one("SELECT * FROM items WHERE codigo=$1", codigo),
  },
  Mutation: {
    createItem: (_, { input }, { db }) =>
      db.one("INSERT INTO items(${this:name}) VALUES(${this:csv}) RETURNING *", input),
    updateItem: (_, { id, input }, { db, update }) =>
      db.one(update(input, null, "items") + " WHERE id=$1 RETURNING *", id),
    deleteItem: (_, { id }, { db }) =>
      db.result("DELETE FROM items WHERE id=$1", id)
        .then(res => res.rowCount),
  },
  Item: {
    biblioteca: (_) => bibliotecas.load(_.biblioteca_id),
    registro: ({ registro_bib_id }, args, { db }) => {
      return db.one("SELECT * FROM registros_bib WHERE id=$1", registro_bib_id);
    }
  },
};

module.exports = resolvers;
