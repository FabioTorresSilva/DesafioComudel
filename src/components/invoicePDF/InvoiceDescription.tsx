import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column", // Change flexDirection to "column"
    marginTop: 12,
  },
  reportTitle: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
    paddingTop: 100,
  },
  description: {
    fontSize: 12,
    paddingTop: 5,
  },
  descriptionTitle: {
    fontSize: 12,
    paddingTop: 5,
  }
});

const InvoiceDescription = ({ formData }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.descriptionTitle}>Descrição:</Text>
    <Text style={styles.description}>{formData.description}</Text>
    <Text style={styles.reportTitle}>
      Obrigado por escolheres a OlisipoWay.
    </Text>
  </View>
);

export default InvoiceDescription;