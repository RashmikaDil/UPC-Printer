/**
 * Generate a unique barcode value based on prefix, start number, and increment
 */
export function generateUniqueBarcode(
    prefix: string,
    startNumber: number,
    index: number,
    incrementStep: number = 1
): string {
    const uniqueNumber = startNumber + (index * incrementStep);
    return `${prefix}${uniqueNumber}`;
}

/**
 * Generate an array of unique barcodes for bulk printing
 */
export function generateBulkBarcodes(
    prefix: string,
    startNumber: number,
    quantity: number,
    incrementStep: number = 1
): string[] {
    const barcodes: string[] = [];
    for (let i = 0; i < quantity; i++) {
        barcodes.push(generateUniqueBarcode(prefix, startNumber, i, incrementStep));
    }
    return barcodes;
}
