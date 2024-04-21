import React from 'react';
import { Page, Document, Image, StyleSheet, ImageProps } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle';
import InvoiceNo from './InvoiceNo';
import InvoiceItemsTable from './InvoiceItemsTable';
import InvoiceDescription from './InvoiceDescription';
import { PdfProps } from '@/types/type';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    width: 160,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

const Pdf: React.FC<PdfProps> = ({ formData, totalValue, invoiceNumber, invoiceDate }) => {
  const logoUrl = 'https://static-media.fluxio.cloud/olisipoway/_icon/share-b2a65c5bedbb26af91c68cece307864c.png';
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logoUrl} />
        <InvoiceTitle />
        <InvoiceNo invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} formData={formData} />
        <InvoiceItemsTable formData={formData} totalValue={totalValue} />
        <InvoiceDescription formData={formData} />
      </Page>
    </Document>
  );
};

export default Pdf;
