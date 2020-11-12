const { gql } = require("apollo-server");

const bibliotecas = require("./bibliotecas");
const cuentas = require("./cuentas");
const direcciones = require("./direcciones");
const grupos_usuario = require("./grupos_usuario");
const items = require("./items");
const multas = require("./multas");
const politicas = require("./politicas");
const prestamos = require("./prestamos");
const registros = require("./registros_bib");
const tipos_item = require("./tipos_item");
const usuarios = require("./usuarios");

const root = gql`
  input FilterInput {
    limit: Int
    offset: Int
    filter: String
  }

  type Query {
    ${bibliotecas.queries}
    ${grupos_usuario.queries}
    ${items.queries}
    ${multas.queries}
    ${politicas.queries}
    ${prestamos.queries}
    ${registros.queries}
    ${tipos_item.queries}
    ${usuarios.queries}
  }

  type Mutation {
    ${bibliotecas.mutations}
    ${cuentas.mutations}
    ${direcciones.mutations}
    ${grupos_usuario.mutations}
    ${items.mutations}
    ${multas.mutations}
    ${politicas.mutations}
    ${prestamos.mutations}
    ${registros.mutations}
    ${tipos_item.mutations}
    ${usuarios.mutations}
  }
`;

const typeDefs = [
  root,
  bibliotecas.types,
  cuentas.types,
  direcciones.types,
  grupos_usuario.types,
  items.types,
  multas.types,
  politicas.types,
  prestamos.types,
  registros.types,
  tipos_item.types,
  usuarios.types,
];

module.exports = typeDefs;
