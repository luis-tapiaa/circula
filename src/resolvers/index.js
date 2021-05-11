const resolvers = [];
const path = require('path').join(__dirname, '.');

require('fs').readdirSync(path).forEach(function (file) {
  if (file !== 'loaders' && file !== 'index.js') resolvers.push(require('./' + file));
});

module.exports = resolvers;
