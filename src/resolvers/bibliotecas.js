const { db, update } = require('../pgAdaptor');

const resolvers = {
  Query: {
    bibliotecas: () => db.any('SELECT * FROM bibliotecas'),
  },
  Mutation: {
    createBiblioteca: (_, { input }) =>
      db.one('INSERT INTO bibliotecas(${this:name}) VALUES(${this:csv}) RETURNING *', input),
    updateBiblioteca: (_, { id, input }) =>
      db.one(update(input, null, 'bibliotecas') + ' WHERE id=$1 RETURNING *', id),
    deleteBiblioteca: (_, { id }) => db.one('DELETE FROM bibliotecas WHERE id=$1 RETURNING id', id),
  },
};

module.exports = resolvers;
