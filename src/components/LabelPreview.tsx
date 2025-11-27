'use client';

import { useLabelStore } from '@/store/useLabelStore';
import BarcodeRenderer from './BarcodeRenderer';
import { generateUniqueBarcode } from '@/utils/uniqueId';
import { cn } from '@/utils/cn';

interface LabelPreviewProps {
    customBarcodeValue?: string;
    className?: string;
}

export default function LabelPreview({ customBarcodeValue, className }: LabelPreviewProps) {
    const {
        topText,
        secondText,
        middleDescription,
        sizeText,
        lastText,
        bottomText,
        fontSize,
        fontWeight,
        fontFamily,
        textColor,
        labelWidth,
        labelHeight,
        padding,
        borderRadius,
        showBorder,
        barcode1,
        barcode2,
        barcodePrefix,
        startNumber,
    } = useLabelStore();

    // Calculate the unique barcode value for the second barcode
    const uniqueBarcodeValue = customBarcodeValue || generateUniqueBarcode(barcodePrefix, startNumber, 0, 1);

    // Convert mm to pixels (assuming 96 DPI: 1mm ≈ 3.7795px)
    const mmToPx = (mm: number) => mm * 3.7795;

    const labelStyle = {
        width: `${mmToPx(labelWidth)}px`,
        height: `${mmToPx(labelHeight)}px`,
        padding: `${mmToPx(padding)}px`,
        borderRadius: `${borderRadius}px`,
        fontFamily,
        color: textColor,
        border: showBorder ? '1px solid #000' : 'none',
    };

    return (
        <div
            className={cn('bg-white flex flex-col items-center justify-between relative', className)}
            style={labelStyle}
        >
            {/* Top Text */}
            <div
                style={{
                    fontSize: `${fontSize.top}px`,
                    fontWeight: fontWeight.top,
                }}
                className="text-center w-full"
            >
                {topText}
            </div>

            {/* Second Text Line */}
            <div
                style={{
                    fontSize: `${fontSize.second}px`,
                    fontWeight: fontWeight.second,
                }}
                className="text-center w-full mt-1"
            >
                {secondText}
            </div>

            {/* First Barcode (value from second text line) */}
            <div className="flex items-center justify-center mt-1">
                <BarcodeRenderer
                    value={secondText || '000000000000'}
                    width={barcode1.width}
                    height={barcode1.height}
                    displayValue={barcode1.displayValue}
                    fontSize={barcode1.fontSize}
                />
            </div>

            {/* Bottom Text Line (independent editable text) */}
            <div
                style={{
                    fontSize: `${fontSize.bottom}px`,
                    fontWeight: fontWeight.bottom,
                }}
                className="text-center w-full mt-1"
            >
                {bottomText}
            </div>

            {/* Middle Description and Size (side by side) */}
            <div className="flex items-center justify-between w-full mt-1 px-1">
                <div
                    style={{
                        fontSize: `${fontSize.middle}px`,
                        fontWeight: fontWeight.middle,
                    }}
                    className="flex-1 text-left"
                >
                    {middleDescription}
                </div>
                <div
                    style={{
                        fontSize: `${fontSize.size}px`,
                        fontWeight: fontWeight.size,
                    }}
                    className="ml-2"
                >
                    {sizeText}
                </div>
            </div>

            {/* Second Barcode (unique auto-generated) */}
            <div className="flex items-center justify-center mt-1">
                <BarcodeRenderer
                    value={uniqueBarcodeValue}
                    width={barcode2.width}
                    height={barcode2.height}
                    displayValue={barcode2.displayValue}
                    fontSize={barcode2.fontSize}
                />
            </div>

            {/* Last Text Line (same as second barcode value) */}
            <div
                style={{
                    fontSize: `${fontSize.last}px`,
                    fontWeight: fontWeight.last,
                }}
                className="text-center w-full mt-1"
            >
                {uniqueBarcodeValue}
            </div>
        </div>
    );
}
