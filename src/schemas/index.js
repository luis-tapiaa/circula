const { gql } = require("apollo-server");

const bibliotecas = require("./bibliotecas");
const bloqueos = require("./bloqueos");
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
    sort: String
  }

  scalar Date
  scalar File
  scalar JSON

  type Query {
    ${bibliotecas.queries}
    ${grupos_usuario.queries}
    ${items.queries}
    ${multas.queries}
    ${politicas.queries}
    ${registros.queries}
    ${tipos_item.queries}
    ${usuarios.queries}
    ${bloqueos.queries}
  }

  type Mutation {
    ${bibliotecas.mutations}
    ${bloqueos.mutations}
    ${cuentas.mutations}
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
  bloqueos.types,
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
