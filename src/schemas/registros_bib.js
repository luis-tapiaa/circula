const { gql } = require("apollo-server");

const types = gql`
  type RegistroOutput {
    registros: [Registro]!
    total: Int
  }

  type Registro {
    id: ID!
    marc: JSON
    items: [Item]!
  }

  input RegistroInput {
    marc: String
  }
`;

const queries = `
  registros(input: FilterInput): RegistroOutput
  registro(id: ID): Registro
`;

const mutations = `
  createRegistro(input: RegistroInput): Registro
  updateRegistro(id: ID!, input: RegistroInput): Registro
  deleteRegistro(id: ID): Int
`;

module.exports = { types, queries, mutations };
