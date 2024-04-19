// components/PdfPreview.js

import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Pdf from '../components/Pdf';

const PdfPreview = ({ formData, totalValue, invoiceNumber, currentDate }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Pdf
        formData={formData}
        totalValue={totalValue}
        invoiceNumber={invoiceNumber}
        currentDate={currentDate}
      />
    </PDFViewer>
  );
};

export default PdfPreview;
