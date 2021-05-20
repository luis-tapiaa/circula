const { db } = require('../../pgAdaptor');
const DataLoader = require('dataloader');

const fetchAllKeys = keys => {
  return db.any('SELECT * FROM bibliotecas WHERE id IN ($1:csv)', [keys]);
};

const batchBibliotecas = async keys => {
  const results = await fetchAllKeys(keys);
  return results;
};

const bibliotecas = new DataLoader(batchBibliotecas);

module.exports = bibliotecas;
