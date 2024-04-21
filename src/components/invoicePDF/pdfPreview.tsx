import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Pdf from './Pdf';
import dynamic from 'next/dynamic';

// Use dynamic import for PDFViewer component
const PDFViewerDynamic = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
  ssr: false, 
});

const PdfPreview = ({ formData, totalValue, invoiceNumber, invoiceDate }) => {
  return (
    <PDFViewerDynamic style={{ width: '100%', height: '100vh' }}>
      <Pdf
        formData={formData}
        totalValue={totalValue}
        invoiceNumber={invoiceNumber}
        invoiceDate={invoiceDate}
      />
    </PDFViewerDynamic>
  );
};

export default PdfPreview;
