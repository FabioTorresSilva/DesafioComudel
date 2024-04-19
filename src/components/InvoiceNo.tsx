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


  const InvoiceNo = ({invoiceNumber, currentDate}) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Fatura nº:</Text>
                <Text style={styles.invoiceDate}>{invoiceNumber}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Data: </Text>
                <Text >{currentDate}</Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo