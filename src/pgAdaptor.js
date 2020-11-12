require('dotenv').config();
const pgPromise = require('pg-promise');
const pgp = pgPromise({});

const config = {
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
};

const db = pgp(config);

const getFields = (info) => ({
    fields: info.fieldNodes[0].selectionSet.selections.map(s => s.name.value)
});

const update = pgp.helpers.update;

exports.db = db;
exports.pgp = pgp;
exports.getFields = getFields;

module.exports = {
    db,
    getFields,
    update
}
