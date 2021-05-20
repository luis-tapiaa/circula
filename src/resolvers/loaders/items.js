const { db } = require('../../pgAdaptor');
const DataLoader = require('dataloader');

const fetchAllKeys = keys => {
  return db.any('SELECT * FROM items WHERE id IN ($1:csv)', [keys]);
};

const batchItems = async keys => {
  const results = await fetchAllKeys(keys);
  return results;
};

const items = new DataLoader(batchItems);

module.exports = items;
