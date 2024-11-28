

require('dotenv').config()
const dbClient = require('mongoose');

async function establishDatabaseConnection() {
    await dbClient.connect(process.env.MONGO_ATLAS_URL);
}

module.exports = establishDatabaseConnection;