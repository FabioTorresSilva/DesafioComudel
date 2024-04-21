import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceTableRowProps } from '@/types/type';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '30%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

  const InvoiceTableRow: React.FC<InvoiceTableRowProps> = ({ items }) => {
    const rows = items.map((item, index) => ( 
      <View style={styles.row} key={index.toString()}>
        <Text style={styles.description}>{item.name}</Text>
        <Text style={styles.qty}>{item.quantity}</Text>
        <Text style={styles.amount}>{item.price}</Text>
      </View>
    ));
    return <Fragment>{rows}</Fragment>;
  };
  
  export default InvoiceTableRow;
  