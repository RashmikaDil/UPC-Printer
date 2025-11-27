'use client';

import { useLabelStore } from '@/store/useLabelStore';
import { Download, Upload, RotateCcw, Moon, Sun } from 'lucide-react';

export default function ControlPanel() {
    const {
        topText,
        setTopText,
        secondText,
        setSecondText,
        middleDescription,
        setMiddleDescription,
        sizeText,
        setSizeText,
        bottomText,
        setBottomText,
        fontSize,
        setFontSize,
        fontWeight,
        setFontWeight,
        fontFamily,
        setFontFamily,
        textColor,
        setTextColor,
        labelWidth,
        setLabelWidth,
        labelHeight,
        setLabelHeight,
        padding,
        setPadding,
        borderRadius,
        setBorderRadius,
        showBorder,
        setShowBorder,
        barcode1,
        setBarcode1,
        barcode2,
        setBarcode2,
        barcodePrefix,
        setBarcodePrefix,
        startNumber,
        setStartNumber,
        incrementStep,
        setIncrementStep,
        printQuantity,
        setPrintQuantity,
        darkMode,
        setDarkMode,
        resetAll,
        saveTemplate,
        loadTemplate,
    } = useLabelStore();

    const handleSaveTemplate = () => {
        const json = saveTemplate();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'label-template.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleLoadTemplate = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const json = event.target?.result as string;
                    loadTemplate(json);
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    return (
        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={handleSaveTemplate}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                    <Download size={16} />
                    Save
                </button>
                <button
                    onClick={handleLoadTemplate}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                    <Upload size={16} />
                    Load
                </button>
                <button
                    onClick={resetAll}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                >
                    <RotateCcw size={16} />
                    Reset
                </button>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                >
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </div>

            {/* Text Content Section */}
            <Section title="Text Content">
                <InputField label="Top Text" value={topText} onChange={setTopText} />
                <InputField label="Second Text (Barcode 1 Value)" value={secondText} onChange={setSecondText} />
                <InputField label="Middle Description" value={middleDescription} onChange={setMiddleDescription} />
                <InputField label="Size Text" value={sizeText} onChange={setSizeText} />
                <InputField label="Bottom Text" value={bottomText} onChange={setBottomText} />
            </Section>

            {/* Font Styling Section */}
            <Section title="Font Styling">
                <div className="grid grid-cols-2 gap-2">
                    <label className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Font Family</label>
                    <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className={`px-2 py-1 border rounded text-sm ${darkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                            : 'bg-white border-gray-300 text-gray-900'
                            }`}
                    >
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="'Times New Roman', serif">Times New Roman</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <label className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Text Color</label>
                    <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-8 w-full rounded"
                    />
                </div>

                <SliderField
                    label="Top Font Size"
                    value={fontSize.top}
                    onChange={(v) => setFontSize('top', v)}
                    min={8}
                    max={24}
                />
                <SliderField
                    label="Second Font Size"
                    value={fontSize.second}
                    onChange={(v) => setFontSize('second', v)}
                    min={8}
                    max={24}
                />
                <SliderField
                    label="Middle Font Size"
                    value={fontSize.middle}
                    onChange={(v) => setFontSize('middle', v)}
                    min={6}
                    max={20}
                />
                <SliderField
                    label="Size Font Size"
                    value={fontSize.size}
                    onChange={(v) => setFontSize('size', v)}
                    min={8}
                    max={20}
                />
                <SliderField
                    label="Last Font Size"
                    value={fontSize.last}
                    onChange={(v) => setFontSize('last', v)}
                    min={8}
                    max={24}
                />
                <SliderField
                    label="Bottom Font Size"
                    value={fontSize.bottom}
                    onChange={(v) => setFontSize('bottom', v)}
                    min={8}
                    max={24}
                />

                <SliderField
                    label="Top Font Weight"
                    value={fontWeight.top}
                    onChange={(v) => setFontWeight('top', v)}
                    min={100}
                    max={900}
                    step={100}
                />
                <SliderField
                    label="Second Font Weight"
                    value={fontWeight.second}
                    onChange={(v) => setFontWeight('second', v)}
                    min={100}
                    max={900}
                    step={100}
                />
                <SliderField
                    label="Middle Font Weight"
                    value={fontWeight.middle}
                    onChange={(v) => setFontWeight('middle', v)}
                    min={100}
                    max={900}
                    step={100}
                />
                <SliderField
                    label="Size Font Weight"
                    value={fontWeight.size}
                    onChange={(v) => setFontWeight('size', v)}
                    min={100}
                    max={900}
                    step={100}
                />
                <SliderField
                    label="Last Font Weight"
                    value={fontWeight.last}
                    onChange={(v) => setFontWeight('last', v)}
                    min={100}
                    max={900}
                    step={100}
                />
                <SliderField
                    label="Bottom Font Weight"
                    value={fontWeight.bottom}
                    onChange={(v) => setFontWeight('bottom', v)}
                    min={100}
                    max={900}
                    step={100}
                />
            </Section>

            {/* Label Layout Section */}
            <Section title="Label Layout">
                <SliderField
                    label="Label Width (mm)"
                    value={labelWidth}
                    onChange={setLabelWidth}
                    min={30}
                    max={100}
                />
                <SliderField
                    label="Label Height (mm)"
                    value={labelHeight}
                    onChange={setLabelHeight}
                    min={30}
                    max={100}
                />
                <SliderField label="Padding (mm)" value={padding} onChange={setPadding} min={0} max={10} />
                <SliderField
                    label="Border Radius (px)"
                    value={borderRadius}
                    onChange={setBorderRadius}
                    min={0}
                    max={20}
                />

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={showBorder}
                        onChange={(e) => setShowBorder(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Show Border</label>
                </div>
            </Section>

            {/* Barcode Settings Section */}
            <Section title="Barcode 1 Settings">
                <SliderField
                    label="Width"
                    value={barcode1.width}
                    onChange={(v) => setBarcode1({ width: v })}
                    min={1}
                    max={4}
                    step={0.5}
                />
                <SliderField
                    label="Height"
                    value={barcode1.height}
                    onChange={(v) => setBarcode1({ height: v })}
                    min={20}
                    max={80}
                />
                <SliderField
                    label="Font Size"
                    value={barcode1.fontSize}
                    onChange={(v) => setBarcode1({ fontSize: v })}
                    min={8}
                    max={16}
                />
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={barcode1.displayValue}
                        onChange={(e) => setBarcode1({ displayValue: e.target.checked })}
                        className="w-4 h-4"
                    />
                    <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Display Value</label>
                </div>
            </Section>

            <Section title="Barcode 2 Settings">
                <SliderField
                    label="Width"
                    value={barcode2.width}
                    onChange={(v) => setBarcode2({ width: v })}
                    min={1}
                    max={4}
                    step={0.5}
                />
                <SliderField
                    label="Height"
                    value={barcode2.height}
                    onChange={(v) => setBarcode2({ height: v })}
                    min={20}
                    max={80}
                />
                <SliderField
                    label="Font Size"
                    value={barcode2.fontSize}
                    onChange={(v) => setBarcode2({ fontSize: v })}
                    min={8}
                    max={16}
                />
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={barcode2.displayValue}
                        onChange={(e) => setBarcode2({ displayValue: e.target.checked })}
                        className="w-4 h-4"
                    />
                    <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Display Value</label>
                </div>
            </Section>

            {/* Auto-Increment Settings Section */}
            <Section title="Auto-Increment Settings">
                <InputField label="Barcode Prefix" value={barcodePrefix} onChange={setBarcodePrefix} />
                <InputField
                    label="Start Number"
                    type="number"
                    value={startNumber.toString()}
                    onChange={(v) => setStartNumber(Number(v))}
                />
                <InputField
                    label="Increment Step"
                    type="number"
                    value={incrementStep.toString()}
                    onChange={(v) => setIncrementStep(Number(v))}
                />
            </Section>

            {/* Print Settings Section */}
            <Section title="Print Settings">
                <InputField
                    label="Quantity to Print"
                    type="number"
                    value={printQuantity.toString()}
                    onChange={(v) => setPrintQuantity(Number(v))}
                />
            </Section>
        </div>
    );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    const darkMode = useLabelStore((state) => state.darkMode);
    return (
        <div className={`border rounded-lg p-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
            <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

function InputField({
    label,
    value,
    onChange,
    type = 'text',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
    const darkMode = useLabelStore((state) => state.darkMode);
    return (
        <div className="grid grid-cols-2 gap-2 items-center">
            <label className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`px-2 py-1 border rounded text-sm ${darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-200'
                    : 'bg-white border-gray-300 text-gray-900'
                    }`}
            />
        </div>
    );
}

function SliderField({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
}) {
    const darkMode = useLabelStore((state) => state.darkMode);
    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center">
                <label className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{label}</label>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{value}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>
    );
}

