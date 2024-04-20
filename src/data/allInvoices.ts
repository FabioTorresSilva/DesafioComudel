const { getMongoCollection } = require("../data/mongodb");

const collectionName = "comudel";

export async function findInvoices() {
  const collection = await getMongoCollection(collectionName);
  const result = await collection.find().toArray();
  return result;
}

