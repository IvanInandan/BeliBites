import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const mantineStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#fff",
    borderColor: state.isFocused ? "#228be6" : "#ced4da", // Mantine's primary and border colors
    boxShadow: state.isFocused ? "0 0 0 2px rgba(34, 139, 230, 0.3)" : "none",
    borderRadius: 4,
    minHeight: 38,
    "&:hover": {
      borderColor: "#228be6",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#868e96", // Mantine placeholder color
  }),
  input: (base) => ({
    ...base,
    fontSize: 14,
    fontFamily: "Inter, system-ui, sans-serif",
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: 14,
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 4,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "#e7f5ff" // Mantine hover background
      : state.isSelected
      ? "#228be6" // Mantine selected background
      : "white",
    color: state.isSelected ? "white" : "black",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#228be6",
    color: "white",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "white",
    ":hover": {
      backgroundColor: "#1864ab",
      color: "white",
    },
  }),
};

export default function CreatableInput({ listOptions }) {
  const [options, setOptions] = useState(listOptions);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (newValue) => {
    setSelectedOption(newValue);
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setOptions((prev) => [...prev, newOption]);
    setSelectedOption(newOption);
  };

  return (
    <CreatableSelect
      isClearable
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={selectedOption}
    />
  );
}
