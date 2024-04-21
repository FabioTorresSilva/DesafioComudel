const { getMongoCollection } = require("../data/mongodb");

const collectionName = "comudel";

export async function insertInvoiceDataBase(
  company : any,
  vat : any,
  products : any,
  description : any,
  totalValue : any,
  invoiceNumber : any,
  invoiceDate : any
) {
  const collection = await getMongoCollection(collectionName);
  await collection.insertOne({
    company,
    vat,
    products,
    description,
    totalValue,
    invoiceNumber,
    invoiceDate,
  });
}
