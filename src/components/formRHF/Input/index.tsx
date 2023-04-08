import React, { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";

type InputProps = {
  name: string;
  label?: string;
  type?: "text" | "number" | "password";
  placeholder?: string;
  control: any;
  isFirst?: boolean;
  error?: any;
};

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  control,
  isFirst,
  error,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            {label && <label htmlFor={name}>{label}</label>}
            <input {...field} id={name} type={type} placeholder={placeholder} />
          </div>
        )}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </>
  );
};
