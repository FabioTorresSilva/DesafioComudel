import React from "react";
import { Product, ProductInputProps } from "@/types/type";

const ProductInput: React.FC<ProductInputProps> = ({ product, index, onChange, onRemove }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e, index);
  };

  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <div className="flex space-x-3 mb-4 items-center">
      <div className="flex flex-col w-full">
        Produto
        <input
          className="flex-1 p-2 border border-gray-500 rounded"
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        Quantidade
        <input
          className="w-32 p-2 border border-gray-500 rounded"
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        Preço
        <div className="flex flex-row gap-3 items-center">
          <input
            className="w-32 p-2 border border-gray-500 rounded"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInput;
