import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Pdf from '../components/invoicePDF/Pdf';
import dynamic from 'next/dynamic';

// Use dynamic import for PDFViewer component
const PDFViewerDynamic = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
  ssr: false, // Disable server-side rendering
});

const PdfPreview = ({ formData, totalValue, invoiceNumber, currentDate }) => {
  return (
    <PDFViewerDynamic style={{ width: '100%', height: '100vh' }}>
      <Pdf
        formData={formData}
        totalValue={totalValue}
        invoiceNumber={invoiceNumber}
        currentDate={currentDate}
      />
    </PDFViewerDynamic>
  );
};

export default PdfPreview;
