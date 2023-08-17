const mongoose = require('mongoose');

/**
 * dbConnectAndSync - Description
 *
 * @param {String} connectionString mongo connection string to use for mongoose
 * @param {Object} dbOptions        options object
 *
 * @return {Promise} Promise that resolves when connection has been made
 */
function dbConnectAndSync(connectionString, dbOptions) {

    return mongoose.connect(connectionString, dbOptions)
        .then(() => {
            return Promise.all(Object.values(mongoose.models).map(async (model) => {

                const list = await model.db.db.listCollections({
                    name: model.collection.name
                }).toArray();
                if (list.length > 0) {
                    return model.syncIndexes();
                }
                return list;
            }));
        });
}

module.exports = {
    dbConnectAndSync,
};
