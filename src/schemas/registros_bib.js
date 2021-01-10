const { gql } = require("apollo-server");

const types = gql`
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
  registros(input: FilterInput): [Registro]! 
  registro(id: ID): Registro
`;

const mutations = `
  createRegistro(input: RegistroInput): Registro
  updateRegistro(id: ID!, input: RegistroInput): Registro
  deleteRegistro(id: ID): Registro
`;

module.exports = { types, queries, mutations };
