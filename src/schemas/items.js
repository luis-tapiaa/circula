const { gql } = require("apollo-server");

const types = gql`
  type Item {
    id: ID!
    codigo: String
    registro: Registro,
    f_adquisicion: String
    estado_item: String
    ubicacion: String
    precio: Float
    biblioteca: Biblioteca
  }

  input ItemInput {
    codigo: String
    registro_bib_id: ID,
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
  addItem(input: ItemInput): Item
  updateItem(id: ID!, input: ItemInput): Item
  dropItem(id: ID): Int
`;

module.exports = { types, queries, mutations };
