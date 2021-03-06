const { gql } = require('apollo-server');

const types = gql`
  type TipoItem {
    id: ID!
    codigo: String
    nombre: String
    costo_prestamo: Float
    disponible_prestamo: Boolean
  }

  input TipoItemInput {
    codigo: String
    nombre: String
    costo_prestamo: Float
    disponible_prestamo: String
  }
`;

const queries = `
  tiposItem: [TipoItem]!
`;

const mutations = `
  createTipoItem(input: TipoItemInput): TipoItem
  updateTipoItem(id: ID!, input: TipoItemInput): TipoItem
  deleteTipoItem(id: ID): TipoItem
`;

module.exports = { types, queries, mutations };
