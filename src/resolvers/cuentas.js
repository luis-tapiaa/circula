const { db, update } = require('../pgAdaptor');
const items = require('./loaders/items');
const multas = require('./loaders/multas');

const resolvers = {
  Mutation: {
    createCuenta: (_, { input }) =>
      db.one('INSERT INTO cuentas(${this:name}) VALUES(${this:csv}) RETURNING *', input),
    updateCuenta: (_, { input, id }) =>
      db.one(update(input, null, 'cuentas') + ' WHERE id=$1 RETURNING *', id),
  },
  Cuenta: {
    multa: ({ multa_id }) => (multa_id ? multas.load(multa_id) : null),
    item: ({ item_id }) => (item_id ? items.load(item_id) : null),
  },
};

module.exports = resolvers;
