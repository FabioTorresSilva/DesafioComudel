import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    color: "white",
  },
  description: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },

  amount: {
    width: "30%",
  },
});

interface InvoiceTableBlankSpaceProps {
    rowsCount: number;
  }

  const InvoiceTableBlankSpace: React.FC<InvoiceTableBlankSpaceProps> = ({ rowsCount }) => {
  const blankRows = Array(rowsCount).fill(0);
  const rows = blankRows.map((x, i) => (
    <View style={styles.row} key={i}>
      <Text style={styles.description}>-</Text>
      <Text style={styles.qty}>-</Text>
      <Text style={styles.amount}>-</Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableBlankSpace;
