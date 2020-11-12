const { db } = require("../../pgAdaptor");
const DataLoader = require("dataloader");

const fetchAllKeys = (keys) => {
  return db.any('SELECT * FROM multas WHERE id IN ($1:csv)', [keys]);
};

const batchMultas = async (keys) => {
  const results = await fetchAllKeys(keys);
  return results;
};

const multas = new DataLoader(batchMultas);

module.exports = multas;
