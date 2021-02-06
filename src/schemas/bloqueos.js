const { gql } = require("apollo-server");

const types = gql`
  type Bloqueo {
    id: ID!
    usuario_id: String
    f_inicio: Date
    f_termino: Date
  }

  input BloqueoInput {
    usuario_id: String
    f_inicio: String
    f_termino: String
  }
`;

const queries = `
  bloqueos: [Bloqueos]!
`;

const mutations = `
  createBloqueo(input: BloqueoInput): Bloqueo
  updateBloqueo(id: ID!, input: BloqueoInput): Bloqueo
  deleteBloqueo(id: ID): Bloqueo
`;

module.exports = { types, queries ,mutations };
