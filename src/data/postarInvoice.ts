const { getMongoCollection } = require("../data/mongodb");

const collectionName = "comudel"

export async function inserirInvoiceDataBase(company,vat,products,description) {
    const collection = await getMongoCollection(collectionName);
    await collection.insertOne({company,vat,products,description});
}

