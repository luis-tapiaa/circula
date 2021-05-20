const { gql } = require('apollo-server');

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
  createBiblioteca(input: BibliotecaInput): Biblioteca
  updateBiblioteca(id: ID!, input: BibliotecaInput): Biblioteca
  deleteBiblioteca(id: ID): Biblioteca
`;

module.exports = { types, queries, mutations };
