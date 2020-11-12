const { gql } = require("apollo-server");

const types = gql`
  type Cuenta {
    id: ID!
    cargo: Float
    pendiente: Float
    multa: Multa
    item: Item
    nota: String
  }

  input CuentaInput {
    cargo: Float
    pendiente: Float
    multa_id: ID
    item_id: ID
    usuario_id: ID
    nota: String
  }
`;

const mutations = `
  addCuenta(input: CuentaInput): Cuenta
  updateCuenta(id: ID!, input: CuentaInput): Cuenta
  dropCuenta(id: ID): Int
`;

module.exports = { types, mutations };
