const { gql } = require("apollo-server");

const types = gql`
  type Direccion {
    id: ID!
    direccion1: String
    direccion2: String
    estado: String
    c_postal: String
    pais_iso: String
  }

  input DireccionInput {
    usuario_id: ID
    direccion1: String
    direccion2: String
    estado: String
    c_postal: String
    pais_iso: String
  }
`;

const mutations = `
  addDireccion(input: DireccionInput): Direccion
  updateDireccion(id: ID!, input: DireccionInput): Direccion
  dropDireccion(id: ID): Int
`;

module.exports = { types, mutations };