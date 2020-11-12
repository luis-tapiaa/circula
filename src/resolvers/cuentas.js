const items = require("./loaders/items");
const multas = require("./loaders/multas");

const resolvers = {
  Mutation: {
    addCuenta: (_, { input }, { db }) =>
      db.one(
        "INSERT INTO cuentas(${this:name}) VALUES(${this:csv}) RETURNING *",
        input
      ),
    updateCuenta: (_, { input, id }, { db, update }) =>
      db
        .one(update(input, null, "cuentas") + " WHERE id=$1 RETURNING *", id)
        .then((res) => res),
    dropCuenta: (_, { id }, { db }) =>
      db
        .result("DELETE FROM cuentas WHERE id=$1", id)
        .then((res) => res.rowCount),
  },
  Cuenta: {
    multa: (_) => {
      if (_.multa_id) {
        return multas.load(_.multa_id);
      } else {
        return null;
      }
    },
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
