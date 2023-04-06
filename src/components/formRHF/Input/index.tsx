import React, { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";

type InputProps = {
  name: string;
  label?: string;
  type?: "text" | "number" | "password";
  placeholder?: string;
  control: any;
  isFirst?: boolean;
};

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  control,
  isFirst,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFirst) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          {label && <label htmlFor={name}>{label}</label>}
          <input
            {...field}
            id={name}
            type={type}
            ref={inputRef}
            placeholder={placeholder}
          />
        </div>
      )}
    />
  );
};
