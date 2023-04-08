import React, { useState } from "react";
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
  control: any;
  error?: any;
};

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  placeholder = "Selecione...",
  control,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedOption(null);
    setSearchValue("");
    setInputValue("");
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
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={selectedOption ? selectedOption.value : ""}
        render={({ field }) => (
          <div>
            <div onClick={() => setIsOpen(true)}>
              {selectedOption ? (
                <>
                  <input
                    onFocus={() => {
                      setIsOpen(true);
                      setSelectedOption(null);
                    }}
                    type="text"
                    value={selectedOption.label}
                  />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleClearSelection}
                  >
                    X
                  </span>
                </>
              ) : (
                <input
                  onFocus={() => setIsOpen(true)}
                  type="text"
                  value={inputValue}
                  placeholder={placeholder ? placeholder : "Pesquisar..."}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setInputValue(e.target.value);
                  }}
                />
              )}
            </div>
            {isOpen && (
              <div className="options-container">
                {filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    style={{
                      cursor: "pointer",
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: "green",
                      margin: 5,
                    }}
                    onClick={() => {
                      handleSelectOption(option);
                      field.onChange(option.value);
                    }}
                  >
                    {selectedOption?.value === option.value
                      ? option.label
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
      {error && <span style={{ color: "red" }}>{error}</span>}
    </>
  );
};
