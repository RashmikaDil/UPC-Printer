'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ControlPanel from '@/components/ControlPanel';
import LabelPreview from '@/components/LabelPreview';
import PrintLayout from '@/components/PrintLayout';
import { Printer } from 'lucide-react';
import { useLabelStore } from '@/store/useLabelStore';

export default function Home() {
  const printRef = useRef<HTMLDivElement>(null);
  const darkMode = useLabelStore((state) => state.darkMode);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });


  return (
    <main className={`min-h-screen p-4 lg:p-8 transition-colors duration-300 ${darkMode
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900'
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
      {/* Header */}
      <div className="no-print mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${darkMode
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'
            : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
          }`}>
          Bulk UPC Label Generator
        </h1>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          Design, customize, and print professional barcode labels
        </p>
      </div>

      {/* Main Content */}
      <div className="no-print grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Controls */}
        <div className="lg:col-span-1">
          <div className={`backdrop-blur-lg border p-6 rounded-2xl shadow-xl ${darkMode
              ? 'bg-gray-800/80 border-gray-700'
              : 'bg-white/80 border-gray-200'
            }`}>
            <ControlPanel />
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-2">
          <div className={`backdrop-blur-lg border p-6 rounded-2xl shadow-xl ${darkMode
              ? 'bg-gray-800/80 border-gray-700'
              : 'bg-white/80 border-gray-200'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                Live Preview
              </h2>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Printer size={20} />
                Print Labels
              </button>
            </div>

            <div className={`rounded-xl p-8 min-h-[500px] flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'
              }`}>
              <LabelPreview className="shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Print Layout */}
      <div className="hidden">
        <div ref={printRef}>
          <PrintLayout />
        </div>
      </div>
    </main>
  );
}


