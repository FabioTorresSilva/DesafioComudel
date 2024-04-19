import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    niflabel:{
        width: 23
    },
    companylabel:{
        width: 50
    },
    invoicelabel:{
        width:50
    },
    datelabel:{
        width: 30
    }
    
  });


  const InvoiceNo = ({invoiceNumber, currentDate , formData}) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.invoicelabel}>Fatura nº:</Text>
                <Text style={styles.invoiceDate}>{invoiceNumber}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.datelabel}>Data: </Text>
                <Text >{currentDate}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.companylabel}>Empresa:</Text>
                <Text style={styles.invoiceDate}>{formData.company}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.niflabel}>NIF:</Text>
                <Text style={styles.invoiceDate}>{formData.vat}</Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo