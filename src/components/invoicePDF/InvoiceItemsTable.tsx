import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";
import { IFormData } from "@/types/type";

interface InvoiceItemsTableProps {
  formData: IFormData;
  totalValue: number; // Assuming totalValue is a number
}

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({
  formData,
  totalValue,
}) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow items={formData.products} />
    <InvoiceTableBlankSpace
      rowsCount={tableRowsCount - formData.products.length}
    />
    <InvoiceTableFooter totalValue={totalValue} />
  </View>
);

export default InvoiceItemsTable;
