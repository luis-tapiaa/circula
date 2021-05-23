const { gql } = require('apollo-server');

const types = gql`
  type Registro {
    id: ID!
    autor: String
    titulo: String
    tipo_item: TipoItem
    isbn_issn: String
    editorial: String
    l_publicacion: String
    f_publicacion: String
    items: [Item]!
  }

  input RegistroInput {
    autor: String
    titulo: String
    tipo_item_id: ID
    isbn_issn: String
    editorial: String
    l_publicacion: String
    f_publicacion: String
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
