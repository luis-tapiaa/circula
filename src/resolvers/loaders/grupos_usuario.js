const { db } = require('../../pgAdaptor');
const DataLoader = require('dataloader');

const fetchAllKeys = keys => {
  return db.any('SELECT * FROM grupos_usuario WHERE id IN ($1:csv)', [keys]);
};

const batchGrupos = async keys => {
  const results = await fetchAllKeys(keys);
  return results;
};

const grupos_usuario = new DataLoader(batchGrupos);

module.exports = grupos_usuario;
