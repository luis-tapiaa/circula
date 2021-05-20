const { gql } = require('apollo-server');

const types = gql`
  type GrupoUsuario {
    id: ID!
    codigo: String
    nombre: String
    biblioteca: Biblioteca
    staff: Boolean
  }

  input GrupoUsuarioInput {
    codigo: String
    nombre: String
    biblioteca_id: ID
    staff: String
  }
`;

const queries = `
  gruposUsuario: [GrupoUsuario]!
`;

const mutations = `
  createGrupoUsuario(input: GrupoUsuarioInput): GrupoUsuario
  updateGrupoUsuario(id: ID!, input: GrupoUsuarioInput): GrupoUsuario
  deleteGrupoUsuario(id: ID): GrupoUsuario
`;

module.exports = { types, queries, mutations };
