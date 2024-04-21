import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import { IFormData } from '@/types/type';

interface InvoiceNoProps {
    invoiceNumber: string;
    invoiceDate: string;
    formData: IFormData;
  }

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


  const InvoiceNo: React.FC<InvoiceNoProps> = ({ invoiceNumber, invoiceDate, formData }) => (

        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.invoicelabel}>Fatura nº:</Text>
                <Text style={styles.invoiceDate}>{invoiceNumber}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.datelabel}>Data: </Text>
                <Text >{invoiceDate}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.companylabel}></Text>
                <Text style={styles.invoiceDate}>{formData.company}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.niflabel}>NIF:</Text>
                <Text style={styles.invoiceDate}>{formData.vat}</Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo