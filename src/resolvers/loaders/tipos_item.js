const { db } = require('../../pgAdaptor');
const DataLoader = require('dataloader');

const fetchAllKeys = keys => {
  return db.any('SELECT * FROM tipos_item WHERE id IN ($1:csv)', [keys]);
};

const batchTipos = async keys => {
  const results = await fetchAllKeys(keys);
  return results;
};

const tipos_item = new DataLoader(batchTipos);

module.exports = tipos_item;
