
const MIN_VALUE = 100000;
 const MAX_VALUE = 900000;

export function generateInvoiceNumber() {
    return Math.floor(MIN_VALUE + Math.random() * MAX_VALUE)
}

export function generateCurrentDate() {
    return new Date().toISOString().split("T")[0]
}