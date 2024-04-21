const { ObjectId } = require('mongodb'); 
const { getMongoCollection } = require('../data/mongodb');

const collectionName = "comudel";

export async function deleteInvoiceDataBase(invoiceId) {
    try {
        let result; 
        const collection = await getMongoCollection(collectionName);
        result = await collection.deleteOne({ _id: new ObjectId(invoiceId) })
        return result.deletedCount
    } catch (error) {
        throw new Error('Falha a apagar Fatura')
    }
}
