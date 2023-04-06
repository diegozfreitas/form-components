import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = {
  name: string;
  options: Option[];
  placeholder?: string;
  isFilterable?: boolean;
  control: any;
};

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  placeholder = "Selecione...",
  control,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedOption(null);
    setSearchValue("");
    setInputValue("");
    inputRef.current?.focus();
  };

  const filterOptions = (options: Option[]) => {
    if (!searchValue) {
      return options;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const filteredOptions = filterOptions(options);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={selectedOption ? selectedOption.value : ""}
      render={({ field }) => (
        <div className={`select-container ${isOpen ? "open" : ""}`}>
          <div
            className={`selected-option ${
              selectedOption ? "" : "placeholder"
            } ${isOpen ? "focused" : ""}`}
            onClick={() => setIsOpen(true)}
          >
            <input
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
              ref={inputRef}
              placeholder={placeholder + "ss"}
              value={
                selectedOption !== null ? selectedOption.label : inputValue
              }
              onChange={(e) => {
                setSearchValue(e.target.value);
                setInputValue(e.target.value);
              }}
            />
            {selectedOption && (
              <span
                onClick={handleClearSelection}
                style={{ cursor: "pointer" }}
              >
                X
              </span>
            )}
          </div>
          {isOpen && (
            <div className="options-container">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  style={{ cursor: "pointer" }}
                  className={`option ${
                    selectedOption?.value === option.value ? "selected" : ""
                  } ${option.disabled ? "disabled" : ""}`}
                  onClick={() => {
                    if (!option.disabled) {
                      handleSelectOption(option);
                      field.onChange(option.value);
                    }
                  }}
                >
                  {selectedOption?.value === option.value
                    ? option.label + "*"
                    : option.label}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className="no-results">Nenhum resultado encontrado</div>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
};
