const { gql } = require('apollo-server');

const types = gql`
  type Item {
    id: ID!
    codigo: String
    registro: Registro
    f_adquisicion: Date
    estado_item: String
    ubicacion: String
    precio: Float
    biblioteca: Biblioteca
  }

  input ItemInput {
    codigo: String
    registro_bib_id: ID
    f_adquisicion: String
    estado_item: String
    ubicacion: String
    precio: Float
    biblioteca_id: ID
  }
`;

const queries = `
  item(codigo: String): Item
`;

const mutations = `
  createItem(input: ItemInput): Item
  updateItem(id: ID!, input: ItemInput): Item
  deleteItem(id: ID): Item
`;

module.exports = { types, queries, mutations };
