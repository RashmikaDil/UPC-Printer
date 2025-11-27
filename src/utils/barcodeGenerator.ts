import JsBarcode from 'jsbarcode';

export interface BarcodeOptions {
    value: string;
    format?: string;
    width?: number;
    height?: number;
    displayValue?: boolean;
    fontSize?: number;
    textAlign?: 'left' | 'center' | 'right';
    textPosition?: 'bottom' | 'top';
    background?: string;
    lineColor?: string;
}

/**
 * Generate barcode as SVG string
 */
export function generateBarcodeToSVG(options: BarcodeOptions): string {
    const {
        value,
        format = 'CODE128',
        width = 2,
        height = 40,
        displayValue = true,
        fontSize = 10,
        textAlign = 'center',
        textPosition = 'bottom',
        background = '#ffffff',
        lineColor = '#000000',
    } = options;

    // Create a temporary SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    try {
        JsBarcode(svg, value, {
            format,
            width,
            height,
            displayValue,
            fontSize,
            textAlign,
            textPosition,
            background,
            lineColor,
            margin: 0,
        });

        return svg.outerHTML;
    } catch (error) {
        console.error('Barcode generation failed:', error);
        return '';
    }
}

/**
 * Generate barcode as data URL (for canvas or image)
 */
export function generateBarcodeToDataURL(options: BarcodeOptions): string {
    const svg = generateBarcodeToSVG(options);
    if (!svg) return '';

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
}
