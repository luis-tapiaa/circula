const { gql } = require('apollo-server');

const types = gql`
  type Multa {
    id: ID!
    codigo: String
    nombre: String
    biblioteca: Biblioteca
    cargo: Float
  }

  input MultaInput {
    codigo: String
    nombre: String
    biblioteca_id: ID
    cargo: Float
  }
`;

const queries = `
  multas: [Multa]!
`;

const mutations = `
  createMulta(input: MultaInput): Multa
  updateMulta(id: ID!, input: MultaInput): Multa
  deleteMulta(id: ID): Multa
`;

module.exports = { types, queries, mutations };
