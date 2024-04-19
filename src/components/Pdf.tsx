import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemsTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import logo from "../../public/olisipo.png"


const styles = StyleSheet.create({
  page: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 30,
      paddingLeft:60,
      paddingRight:60,
      lineHeight: 1.5,
      flexDirection: 'column',
  }, 
  logo: {
      width: 120,
      height: 66,
      marginLeft: 'auto',
      marginRight: 'auto'
  }
});

const Pdf = ({ formData,  totalValue}) => {
  const logoUrl = 'https://static-media.fluxio.cloud/olisipoway/_icon/share-b2a65c5bedbb26af91c68cece307864c.png'; // Substitua com o link direto para sua imagem

  return (
    <Document>
    <Page size="A4" style={styles.page}>
        <Image alt="logo" style={styles.logo} src={logoUrl} />
        <InvoiceTitle title="Fatura"/>
        <InvoiceNo formData={formData}/>
        <InvoiceItemsTable formData={formData} totalValue={totalValue} />
        <InvoiceThankYouMsg />
    </Page>
</Document>
  );
};

export default Pdf;
