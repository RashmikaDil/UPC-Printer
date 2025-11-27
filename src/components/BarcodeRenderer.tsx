'use client';

import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeRendererProps {
    value: string;
    format?: string;
    width?: number;
    height?: number;
    displayValue?: boolean;
    fontSize?: number;
    className?: string;
}

export default function BarcodeRenderer({
    value,
    format = 'CODE128',
    width = 2,
    height = 40,
    displayValue = true,
    fontSize = 10,
    className = '',
}: BarcodeRendererProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current && value) {
            try {
                JsBarcode(svgRef.current, value, {
                    format,
                    width,
                    height,
                    displayValue,
                    fontSize,
                    textAlign: 'center',
                    textPosition: 'bottom',
                    background: '#ffffff',
                    lineColor: '#000000',
                    margin: 0,
                });
            } catch (error) {
                console.error('Barcode generation failed:', error);
            }
        }
    }, [value, format, width, height, displayValue, fontSize]);

    return <svg ref={svgRef} className={className} />;
}
