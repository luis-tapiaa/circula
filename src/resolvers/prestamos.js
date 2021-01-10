const items = require("./loaders/items");

const resolvers = {
  Mutation: {
    createPrestamo: (_, { input }, { db }) =>
      db.tx(t => {
        return t.one("INSERT INTO prestamos(${this:name}) VALUES(${this:csv}) RETURNING *", input)
          .then(loan => {
            const query = t.none("UPDATE items SET estado_item='Prestado' WHERE id=$1", loan.item_id);
            return t.batch([loan]);
          });
      }).then(res => res[0]),
    renewPrestamo: (_, { input, id }, { db, update }) =>
      db.one(update(input, null, "prestamos") + " WHERE id=$1 RETURNING *", id),    
    returnPrestamo: (_, { input, id }, { db }) =>
      db.tx(t => {
        return t.one("UPDATE prestamos SET f_devolucion=$1 WHERE id=$2 RETURNING *", [input.f_devolucion, id])
          .then(loan => {
            const q2 = t.one("UPDATE items SET estado_item='Disponible' WHERE id=$1 RETURNING *", loan.item_id);
            return t.batch([loan]);
          });
      }).then(res => res[0])
  },
  Prestamo: {
    item: ({ item_id }) => (item_id ? items.load(item_id) : null),
  },
};

module.exports = resolvers;
