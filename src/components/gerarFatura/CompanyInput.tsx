import React from "react";
import { CompanyInputProps, } from "@/types/type";


  const CompanyInput: React.FC<CompanyInputProps> = ({ formData, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange({ ...formData, [name]: value });
    };
  
    return (
      <>
        <div className="flex gap-3">
          <div className="flex flex-col w-full ">
            Nome Empresa
            <input
              className="w-full p-2 border border-gray-300 rounded mb-4"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange} // Chame a função handleChange ao alterar o campo de entrada
            />
          </div>
          <div className="flex flex-col">
            NIF
            <input
              className="w-72 p-2 border border-gray-300 rounded mb-4"
              type="text"
              name="vat"
              placeholder="(9 dígitos)"
              value={formData.vat}
              onChange={handleChange} // Chame a função handleChange ao alterar o campo de entrada
            />
          </div>
        </div>
      </>
    );
  };
  
  export default CompanyInput;