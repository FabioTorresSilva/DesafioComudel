import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({
  theme: {
    extend: {
      colors: {
        custom: "cornflowerblue",
      },
    },
  },
});

const Pdf = ({ formData = { company: "Default Company", vat: "Default VAT", products: [{ name: "Product 1", quantity: 1, price: 10 }, { name: "Product 2", quantity: 2, price: 20 }], description: "Default Description" }, totalValue = 50 }) => {
  return (
    <Document>
      <Page size="A4" style={tw("p-10 flex flex-col gap-4 justify-center w-full")}>
        <View style={tw("flex flex-col justify-center ")}>
          <Text style={tw("text-bold text-2xl")}>Fatura nº {formData.numero}</Text>
          <Text style={tw("flex flex-col text-right ")}>
          <Text style={tw("flex-end text-blue-900")}>{formData.company}</Text>
          <Text style={tw("flex-end ")}>NIF: {formData.vat}</Text>
          </Text>
          <Text>Produtos:</Text>
          {formData.products.map((product, index) => (
            <View key={index} style={tw("mt-2")}>
              <Text>Nome: {product.name}</Text>
              <Text>Quantidade: {product.quantity}</Text>
              <Text>Preço: {product.price}</Text>
            </View>
          ))}
          <Text>Total: {totalValue}</Text>
          <Text>Descrição:</Text>
          <Text>{formData.description}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;