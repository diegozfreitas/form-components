import React from "react";
import { Controller, UseControllerProps } from "react-hook-form";

type CheckboxOption = {
  label: string;
  value: string;
};

type Props = UseControllerProps & {
  options: CheckboxOption[];
  singleSelect?: boolean;
  label: string;
};

export const Radio: React.FC<Props> = ({
  name,
  control,
  defaultValue = [],
  options,
  singleSelect = false,
  rules,
  label,
  ...rest
}) => {
  const isSingleSelect = singleSelect || options.length === 1;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <span>{label}</span>
          <div role="group" aria-labelledby={`${name}-label`} {...rest}>
            {options.map((option) => {
              const handleChange = () => {
                if (isSingleSelect) {
                  onChange(option.value);
                } else {
                  const values = Array.isArray(value) ? value : [value];
                  const index = values.indexOf(option.value);
                  if (index === -1) {
                    onChange([...values, option.value]);
                  } else {
                    values.splice(index, 1);
                    onChange(values);
                  }
                }
              };

              return (
                <div key={option.value}>
                  <label htmlFor={`${name}-${option.value}`}>
                    <input
                      type="checkbox"
                      id={`${name}-${option.value}`}
                      name={name}
                      value={option.value}
                      checked={
                        isSingleSelect
                          ? value === option.value
                          : Array.isArray(value) && value.includes(option.value)
                      }
                      onChange={handleChange}
                      onBlur={onBlur}
                    />
                    {option.label}
                  </label>
                </div>
              );
            })}
          </div>
        </>
      )}
    />
  );
};
