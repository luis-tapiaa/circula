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

module.exports = { types };
