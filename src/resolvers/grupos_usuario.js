const { db, update } = require('../pgAdaptor');
const bibliotecas = require('./loaders/bibliotecas');

const resolvers = {
  Query: {
    gruposUsuario: () => db.any('SELECT * FROM grupos_usuario'),
  },
  Mutation: {
    createGrupoUsuario: (_, { input }) =>
      db.one('INSERT INTO grupos_usuario(${this:name}) VALUES(${this:csv}) RETURNING *', input),
    updateGrupoUsuario: (_, { input, id }) =>
      db.one(update(input, null, 'grupos_usuario') + ' WHERE id=$1 RETURNING *', id),
    deleteGrupoUsuario: (_, { id }) =>
      db.one('DELETE FROM grupos_usuario WHERE id=$1 RETURNING id', id),
  },
  GrupoUsuario: {
    biblioteca: ({ biblioteca_id }) => (biblioteca_id ? bibliotecas.load(biblioteca_id) : null),
  },
};

module.exports = resolvers;
