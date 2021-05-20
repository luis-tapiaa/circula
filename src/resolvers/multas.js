const { db, update } = require('../pgAdaptor');
const bibliotecas = require('./loaders/bibliotecas');

const resolvers = {
  Query: {
    multas: () => db.any('SELECT * FROM multas'),
  },
  Mutation: {
    createMulta: (_, { input }) =>
      db.one('INSERT INTO multas(${this:name}) VALUES(${this:csv}) RETURNING *', input),
    updateMulta: (_, { input, id }) =>
      db.one(update(input, null, 'multas') + ' WHERE id=$1 RETURNING *', id),
    deleteMulta: (_, { id }) => db.one('DELETE FROM multas WHERE id=$1 RETURNING id', id),
  },
  Multa: {
    biblioteca: ({ biblioteca_id }) => (biblioteca_id ? bibliotecas.load(biblioteca_id) : null),
  },
};

module.exports = resolvers;
