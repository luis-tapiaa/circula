const { gql } = require("apollo-server");

const types = gql`
  scalar JSON

  type Prestamo {
    id: ID!
    item: Item   
    f_prestamo: Date
    f_vencimiento: Date
    f_devolucion: Date
    renovaciones: Int
  }

  input PrestamoInput {
    usuario_id: ID    
    item_id: ID    
    f_prestamo: String
    f_vencimiento: String
    f_devolucion: String
    renovaciones: Int
  }
`;

const queries = `
  prestamo(codigo: String): Prestamo
`;

const mutations = `
  addPrestamo(input: PrestamoInput): Prestamo
  updatePrestamo(id: ID!, input: PrestamoInput): Prestamo
  dropPrestamo(id: ID): Int
`;

module.exports = { types, queries, mutations };
