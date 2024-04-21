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
            Nome da Empresa
            <input
              className="w-full p-2 border border-gray-500 rounded mb-4"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            NIF
            <input
              className="w-80 p-2 border border-gray-500 rounded mb-4"
              type="text"
              name="vat"
              placeholder="(9 dígitos)"
              value={formData.vat}
              onChange={handleChange} 
            />
          </div>
        </div>
      </>
    );
  };
  
  export default CompanyInput;