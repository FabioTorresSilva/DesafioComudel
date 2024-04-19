import { MAX_VALUE, MIN_VALUE } from "@/constants/constants"

export function generateInvoiceNumber() {
    return Math.floor(MIN_VALUE + Math.random() * MAX_VALUE)
}

export function generateCurrentDate() {
    return new Date().toISOString().split("T")[0]
}