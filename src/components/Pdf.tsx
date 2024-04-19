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

const Pdf = ({
  formData = {
    company: "Default Company",
    vat: "Default VAT",
    date: "13/04",
    invoice: 1213123,
    products: [
      { name: "Product 1", quantity: 1, price: 10 },
      { name: "Product 2", quantity: 2, price: 20 },
    ],
    description: "Default Description",
  },
  totalValue = 50,
}) => {
  return (
    <Document>
      <Page
        style={tw("p-10 flex flex-col gap-4 justify-center w-full")}
      >
        <View style={tw("flex flex-col justify-center ")}>
          <Text style={tw("text-bold text-2xl ")}>
            Fatura nº {formData.invoice}
          </Text>
          <Text style={tw("pb-10")}>Data: {formData.date}</Text>
          <Text style={tw("flex flex-col text-right ")}>
            <Text style={tw("flex-end text-blue-900")}>{formData.company}</Text>
            <Text style={tw("flex-end pb-20 ")}>NIF: {formData.vat}</Text>
          </Text>

          <Text style={tw("border ")}>
            <Text
              style={tw(
                "border-b-2 py-2 border-black flex flex-row justify-between px-2 gap-40 text-right "
              )}
            >
              <Text>Quantidade</Text>
              <Text>Produtos</Text>
              <Text>Preço</Text>
            </Text>
            {formData.products.map((product, index) => (
              <View key={index} style={tw("mt-2 px-4 flex flex-col")}>
                <Text style={tw("text-bold  flex justify-between ")}>
                  <Text>{product.quantity}</Text>
                  <Text>{product.name}</Text>
                  <Text>{product.price}</Text>
                </Text>
              </View>
            ))}
          </Text>
          <Text style={tw("pb-40 text-right text-blue font-bold  ")}>
            Total: {totalValue}
          </Text >
          <Text style={tw(" py-2 border-b-2 border-black ")}>Descrição:</Text>
          <Text >{formData.description}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Pdf;
