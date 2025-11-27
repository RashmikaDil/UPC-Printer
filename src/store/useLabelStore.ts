import { create } from 'zustand';

export interface LabelState {
    // Text Content
    topText: string;
    secondText: string;
    middleDescription: string;
    sizeText: string;
    lastText: string;
    bottomText: string; // New independent text field

    // Font Styles
    fontSize: {
        top: number;
        second: number;
        middle: number;
        size: number;
        last: number;
        bottom: number;
    };
    fontWeight: {
        top: number;
        second: number;
        middle: number;
        size: number;
        last: number;
        bottom: number;
    };
    fontFamily: string;
    textColor: string;

    // Label Layout
    labelWidth: number; // in mm
    labelHeight: number; // in mm
    padding: number; // in mm
    borderRadius: number; // in px
    showBorder: boolean;

    // Barcode Settings
    barcode1: {
        width: number;
        height: number;
        displayValue: boolean;
        fontSize: number;
    };
    barcode2: {
        width: number;
        height: number;
        displayValue: boolean;
        fontSize: number;
    };

    // Auto-increment Settings
    barcodePrefix: string;
    startNumber: number;
    incrementStep: number;

    // Print Settings
    printQuantity: number;

    // Dark Mode
    darkMode: boolean;
}

interface LabelActions {
    setTopText: (value: string) => void;
    setSecondText: (value: string) => void;
    setMiddleDescription: (value: string) => void;
    setSizeText: (value: string) => void;
    setLastText: (value: string) => void;
    setBottomText: (value: string) => void;

    setFontSize: (field: keyof LabelState['fontSize'], value: number) => void;
    setFontWeight: (field: keyof LabelState['fontWeight'], value: number) => void;
    setFontFamily: (value: string) => void;
    setTextColor: (value: string) => void;

    setLabelWidth: (value: number) => void;
    setLabelHeight: (value: number) => void;
    setPadding: (value: number) => void;
    setBorderRadius: (value: number) => void;
    setShowBorder: (value: boolean) => void;

    setBarcode1: (updates: Partial<LabelState['barcode1']>) => void;
    setBarcode2: (updates: Partial<LabelState['barcode2']>) => void;

    setBarcodePrefix: (value: string) => void;
    setStartNumber: (value: number) => void;
    setIncrementStep: (value: number) => void;

    setPrintQuantity: (value: number) => void;
    setDarkMode: (value: boolean) => void;

    resetAll: () => void;
    saveTemplate: () => string;
    loadTemplate: (json: string) => void;
}

const defaultState: LabelState = {
    topText: '323408278',
    secondText: '120014848250',
    middleDescription: 'A19 MENTION BREAKER',
    sizeText: '2C',
    lastText: 'A6666421092',
    bottomText: 'MADE IN INDIA',

    fontSize: {
        top: 12,
        second: 11,
        middle: 8,
        size: 10,
        last: 11,
        bottom: 9,
    },
    fontWeight: {
        top: 400,
        second: 400,
        middle: 400,
        size: 700,
        last: 400,
        bottom: 400,
    },
    fontFamily: 'Arial, sans-serif',
    textColor: '#000000',

    labelWidth: 50,
    labelHeight: 50,
    padding: 3,
    borderRadius: 4,
    showBorder: true,

    barcode1: {
        width: 2,
        height: 40,
        displayValue: true,
        fontSize: 10,
    },
    barcode2: {
        width: 2,
        height: 40,
        displayValue: true,
        fontSize: 10,
    },

    barcodePrefix: 'A',
    startNumber: 6666421092,
    incrementStep: 1,

    printQuantity: 1,
    darkMode: false,
};

export const useLabelStore = create<LabelState & LabelActions>((set) => ({
    ...defaultState,

    setTopText: (value) => set({ topText: value }),
    setSecondText: (value) => set({ secondText: value }),
    setMiddleDescription: (value) => set({ middleDescription: value }),
    setSizeText: (value) => set({ sizeText: value }),
    setLastText: (value) => set({ lastText: value }),
    setBottomText: (value) => set({ bottomText: value }),

    setFontSize: (field, value) =>
        set((state) => ({ fontSize: { ...state.fontSize, [field]: value } })),
    setFontWeight: (field, value) =>
        set((state) => ({ fontWeight: { ...state.fontWeight, [field]: value } })),
    setFontFamily: (value) => set({ fontFamily: value }),
    setTextColor: (value) => set({ textColor: value }),

    setLabelWidth: (value) => set({ labelWidth: value }),
    setLabelHeight: (value) => set({ labelHeight: value }),
    setPadding: (value) => set({ padding: value }),
    setBorderRadius: (value) => set({ borderRadius: value }),
    setShowBorder: (value) => set({ showBorder: value }),

    setBarcode1: (updates) =>
        set((state) => ({ barcode1: { ...state.barcode1, ...updates } })),
    setBarcode2: (updates) =>
        set((state) => ({ barcode2: { ...state.barcode2, ...updates } })),

    setBarcodePrefix: (value) => set({ barcodePrefix: value }),
    setStartNumber: (value) => set({ startNumber: value }),
    setIncrementStep: (value) => set({ incrementStep: value }),

    setPrintQuantity: (value) => set({ printQuantity: value }),
    setDarkMode: (value) => set({ darkMode: value }),

    resetAll: () => set(defaultState),

    saveTemplate: () => {
        const state = useLabelStore.getState();
        const template: LabelState = {
            topText: state.topText,
            secondText: state.secondText,
            middleDescription: state.middleDescription,
            sizeText: state.sizeText,
            lastText: state.lastText,
            bottomText: state.bottomText,
            fontSize: state.fontSize,
            fontWeight: state.fontWeight,
            fontFamily: state.fontFamily,
            textColor: state.textColor,
            labelWidth: state.labelWidth,
            labelHeight: state.labelHeight,
            padding: state.padding,
            borderRadius: state.borderRadius,
            showBorder: state.showBorder,
            barcode1: state.barcode1,
            barcode2: state.barcode2,
            barcodePrefix: state.barcodePrefix,
            startNumber: state.startNumber,
            incrementStep: state.incrementStep,
            printQuantity: state.printQuantity,
            darkMode: state.darkMode,
        };
        return JSON.stringify(template, null, 2);
    },

    loadTemplate: (json) => {
        try {
            const template = JSON.parse(json) as LabelState;
            set(template);
        } catch (error) {
            console.error('Failed to load template:', error);
        }
    },
}));
