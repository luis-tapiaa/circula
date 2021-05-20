const { db, update } = require('../pgAdaptor');
const tipos_item = require('./loaders/tipos_item');

const resolvers = {
  Query: {
    registros: (_, { input }) => {
      const { limit = 5, offset = 0, filter = '', sort = '' } = input || {};

      return db.any('SELECT * FROM registros_bib ' + filter + ' ' + sort + ' LIMIT $1 OFFSET $2', [
        limit,
        offset,
      ]);
    },
    registro: (_, { id }) => db.one('SELECT * FROM registros_bib WHERE id=$1', id),
  },
  Mutation: {
    createRegistro: (_, { input }) =>
      db.one('INSERT INTO registros_bib(${this:name}) VALUES(${this:csv}) RETURNING *', input),
    updateRegistro: (_, { id, input }) =>
      db.one(update(input, null, 'registros_bib') + ' WHERE id=$1 RETURNING *', id),
    deleteRegistro: (_, { id }) => db.one('DELETE FROM registros_bib WHERE id=$1 RETURNING id', id),
  },
  Registro: {
    items: ({ id }) => db.any('SELECT * FROM items WHERE registro_bib_id=$1', id),
    tipo_item: ({ tipo_item_id }) => (tipo_item_id ? tipos_item.load(tipo_item_id) : null),
  },
};

module.exports = resolvers;
