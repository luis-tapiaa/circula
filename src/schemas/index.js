const { gql } = require('apollo-server');

const schemas = [];

require('fs')
  .readdirSync(__dirname)
  .forEach(function (file) {
    if (file !== 'index.js') {
      schemas.push(require('./' + file));
    }
  });

let query = '';
let mutation = '';

schemas.forEach(schema => {
  if (schema.queries) query += schema.queries;
  if (schema.mutations) mutation += schema.mutations;
});

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

  type Query { ${query} }
  type Mutation { ${mutation} }
`;

const typeDefs = [root, ...schemas.map(schema => schema.types)];

module.exports = typeDefs;
