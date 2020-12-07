const { gql } = require("apollo-server");

const types = gql`
  type GrupoUsuario {
    id: ID!
    codigo: String
    nombre: String
    biblioteca: Biblioteca
  }

  input GrupoUsuarioInput {
    codigo: String
    nombre: String
    biblioteca_id: ID
  }
`;

const queries = `
  gruposUsuario: [GrupoUsuario]!
`;

const mutations = `
  createGrupoUsuario(input: GrupoUsuarioInput): GrupoUsuario
  updateGrupoUsuario(id: ID!, input: GrupoUsuarioInput): GrupoUsuario
  deleteGrupoUsuario(id: ID): Int
`;

module.exports = { types, queries, mutations };
