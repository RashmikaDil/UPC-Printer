'use client';

import { useLabelStore } from '@/store/useLabelStore';
import LabelPreview from './LabelPreview';
import { generateBulkBarcodes } from '@/utils/uniqueId';

export default function PrintLayout() {
    const { printQuantity, barcodePrefix, startNumber, incrementStep } = useLabelStore();

    // Generate unique barcodes for all labels
    const uniqueBarcodes = generateBulkBarcodes(barcodePrefix, startNumber, printQuantity, incrementStep);

    return (
        <div className="print-layout">
            <div className="grid grid-cols-3 gap-4 p-4">
                {uniqueBarcodes.map((barcode, index) => (
                    <div key={index} className="print-label-wrapper">
                        <LabelPreview customBarcodeValue={barcode} />
                    </div>
                ))}
            </div>

            <style jsx>{`
        @media print {
          .print-layout {
            display: block;
          }
          .print-label-wrapper {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
        </div>
    );
}
