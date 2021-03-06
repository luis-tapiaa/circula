const { db, update } = require('../pgAdaptor');
const bibliotecas = require('./loaders/bibliotecas');
const grupos_usuario = require('./loaders/grupos_usuario');
const tipos_item = require('./loaders/tipos_item');

const resolvers = {
  Query: {
    politicas: () => db.any('SELECT * FROM politicas'),
  },
  Mutation: {
    createPolitica: (_, { input }) =>
      db.one('INSERT INTO politicas(${this:name}) VALUES(${this:csv}) RETURNING *', input),
    updatePolitica: (_, { input, id }) =>
      db.one(update(input, null, 'politicas') + ' WHERE id=$1 RETURNING *', id),
    deletePolitica: (_, { id }) => db.one('DELETE FROM politicas WHERE id=$1 RETURNING id', id),
  },
  Politica: {
    biblioteca: ({ biblioteca_id }) => (biblioteca_id ? bibliotecas.load(biblioteca_id) : null),
    grupo_usuario: ({ grupo_usuario_id }) =>
      grupo_usuario_id ? grupos_usuario.load(grupo_usuario_id) : null,
    tipo_item: ({ tipo_item_id }) => (tipo_item_id ? tipos_item.load(tipo_item_id) : null),
  },
};

module.exports = resolvers;
