const { gql } = require("apollo-server");

const types = gql`
  type Auth {
    token: String
    usuario: Usuario
  }

  type Usuario {
    id: ID!
    codigo: String
    a_paterno: String
    a_materno: String
    nombre: String
    f_nacimiento: Date
    genero: String
    biblioteca: Biblioteca
    grupo_usuario: GrupoUsuario
    direcciones: [Direccion]!
    f_registro: Date
    f_vencimiento: Date
    email: String
    telefono: String
    celular: String
    usuario: String
    password: String
    foto: File
    prestamos: [Prestamo]!
    cuentas: [Cuenta]!
  }

  input UsuarioInput {
    codigo: String
    a_paterno: String
    a_materno: String
    nombre: String
    f_nacimiento: String
    genero: String
    biblioteca_id: ID
    grupo_usuario_id: ID
    f_registro: String
    f_vencimiento: String
    email: String
    telefono: String
    celular: String
    usuario: String
    password: String
    direcciones: [DireccionInput]
    foto: Upload
  }
`;

const queries = `
  login(usuario: String!, password: String!): Auth
  verificar(token: String): Usuario
  usuarios(input: FilterInput): [Usuario]
  usuario(id: ID, codigo: String): Usuario
`;

const mutations = `
  createUsuario(input: UsuarioInput): Usuario
  updateUsuario(id: ID!, input: UsuarioInput): Usuario
  deleteUsuario(id: ID): Usuario
`;

module.exports = { types, queries, mutations };
