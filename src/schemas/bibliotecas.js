const { gql } = require("apollo-server");

const types = gql`
  type Biblioteca {
    id: ID!
    codigo: String
    nombre: String
    url: String
  }

  input BibliotecaInput {
    codigo: String
    nombre: String
    url: String
  }
`;

const queries = `
  bibliotecas: [Biblioteca]!
`;

const mutations = `
  addBiblioteca(input: BibliotecaInput): Biblioteca
  updateBiblioteca(id: ID!, input: BibliotecaInput): Biblioteca
  dropBiblioteca(id: ID): Int
`;

module.exports = { types, queries, mutations };
