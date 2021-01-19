const { gql } = require("apollo-server");

const types = gql`
  type Prestamo {
    id: ID!
    item: Item   
    f_prestamo: Date
    f_vencimiento: Date
    f_devolucion: Date
    renovaciones: Int
    usuario: Usuario
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

const mutations = `
  createPrestamo(input: PrestamoInput): Prestamo
  renewPrestamo(id: ID!, input: PrestamoInput): Prestamo
  returnPrestamo(codigo: String, input: PrestamoInput): Prestamo
`;

module.exports = { types, mutations };
