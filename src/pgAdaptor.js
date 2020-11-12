const pgPromise = require('pg-promise');
const pgp = pgPromise({});

const config = {
    connectionString: "postgres://earbgjdo:Vbgz3QxOQjbHY04_gZS7R20LfUQZ68BZ@lallah.db.elephantsql.com:5432/earbgjdo"
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