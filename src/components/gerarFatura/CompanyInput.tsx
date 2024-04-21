import React from "react";
import { CompanyInputProps, IFormData, } from "@/types/type";

const CompanyInput: React.FC<CompanyInputProps> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value } as IFormData);
  };

    return (
      <>
        <div className="flex gap-4">
          <div className="flex flex-col w-full min-w-40 ">
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
              className="sm:min-w-80 w-full p-2 border border-gray-500 rounded "
              type="number"
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