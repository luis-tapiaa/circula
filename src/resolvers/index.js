const bibliotecas = require("./bibliotecas");
const cuentas = require("./cuentas");
const grupos_usuario = require("./grupos_usuario");
const items = require('./items');
const multas = require('./multas');
const politicas = require('./politicas');
const prestamos = require('./prestamos');
const registros_bib = require("./registros_bib");
const tipos_item = require('./tipos_item');
const usuarios = require("./usuarios");

const resolvers = [
    bibliotecas,
    cuentas,
    grupos_usuario,
    items,
    multas,
    politicas,
    prestamos,
    registros_bib,
    tipos_item,
    usuarios
];

module.exports = resolvers;
