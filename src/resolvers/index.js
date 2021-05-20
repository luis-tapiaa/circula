const resolvers = [];

require('fs')
  .readdirSync(__dirname)
  .forEach(function (file) {
    if (file !== 'loaders' && file !== 'index.js') resolvers.push(require('./' + file));
  });

module.exports = resolvers;
