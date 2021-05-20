const { db, update } = require('../pgAdaptor');

const resolvers = {
  Query: {
    tiposItem: () => db.any('SELECT * FROM tipos_item'),
  },
  Mutation: {
    createTipoItem: (_, { input }) =>
      db.one('INSERT INTO tipos_item(${this:name}) VALUES(${this:csv}) RETURNING *', input),
    updateTipoItem: (_, { id, input }) =>
      db.one(update(input, null, 'tipos_item') + ' WHERE id=$1 RETURNING *', id),
    deleteTipoItem: (_, { id }) => db.one('DELETE FROM tipos_item WHERE id=$1 RETURNING id', id),
  },
};

module.exports = resolvers;
