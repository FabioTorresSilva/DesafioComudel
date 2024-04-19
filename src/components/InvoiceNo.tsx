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
    label: {
        width: 60
    }
    
  });


  const InvoiceNo = ({formData}) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Fatura nº:</Text>
                <Text style={styles.invoiceDate}>{formData.invoice}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Data: </Text>
                <Text >{formData.data}</Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo