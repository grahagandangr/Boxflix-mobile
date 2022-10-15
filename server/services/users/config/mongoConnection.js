const { MongoClient } = require("mongodb");
const credential = process.env.MONGO_CREDENTIAL;

const mongoUri = `mongodb+srv://${credential}@cluster0.urhqov4.mongodb.net/?retryWrites=true&w=majority`;
let db;
const client = new MongoClient(mongoUri);

async function mongoConnect() {
  try {
    const database = client.db("boxflixDB");
    db = database;
    return database;
  } catch (error) {
    await client.close();
  }
}

function getDatabase() {
  return db;
}

module.exports = { mongoConnect, getDatabase };
