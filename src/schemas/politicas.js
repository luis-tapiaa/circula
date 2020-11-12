const { gql } = require("apollo-server");

const types = gql`
  type Politica {
    id: ID!
    nombre: String
    descripcion: String
    biblioteca: Biblioteca
    grupo_usuario: GrupoUsuario
    tipo_item: TipoItem
    prestamos: Int
    p_prestamo: String
    p_sancion: String
    multa: Float
    renovaciones: Int
    p_gracia: String
  }

  input PoliticaInput {
    nombre: String
    descripcion: String
    biblioteca_id: ID
    grupo_usuario_id: ID
    tipo_item_id: ID
    prestamos: Int
    p_prestamo: String
    p_sancion: String
    multa: Float
    renovaciones: Int
    p_gracia: String
  }
`;

const queries = `
  politicas: [Politica]!
`;

const mutations = `
  addPolitica(input: PoliticaInput): Politica
  updatePolitica(id: ID!, input: PoliticaInput): Politica
  dropPolitica(id: ID): Int
`;

module.exports = { types, queries, mutations };
