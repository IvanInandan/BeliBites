// Search vs Value:
// Search - Current text input that user is typing; gets updated in real-time with input
// Value - Only updates when user selects an option or creates a new one

// Value vs Label:
// Value - Internal ID or Key (ie: us)
// Label - Human readable text shown in UI (ie: United States of America)

import { useState, useEffect, useRef } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";

export default function SelectCreatable({
  label,
  placeholder,
  listOptions,
  value,
  onChange,
}) {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setShowAllOnOpen(false);
    },
  });

  const [data, setData] = useState(listOptions); // Stores passed in array of objects (value: "", label: "") as drop-down list
  const [search, setSearch] = useState("");
  const [showAllOnOpen, setShowAllOnOpen] = useState(false);
  const inputRef = useRef();

  const normalizedSearch = search.trim().toLowerCase(); // When typing into field, grabs text and returns all lowercase
  const exactOptionMatch = data.some(
    (item) => item.label.toLowerCase() === normalizedSearch
  ); // Sets to true when exact match is found between typed input and item.label found in list

  // If text field is blank, show all options. Else, filter data that contains text input as 'substring' and return those items.
  const filteredOptions = showAllOnOpen
    ? data
    : data.filter((item) =>
        item.label.toLowerCase().includes(normalizedSearch)
      );

  //  For each item in filtered options, generate it as a dropdown choice
  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.label} key={item.label}>
      {item.label}
    </Combobox.Option>
  ));

  // Select first match on Enter key
  useEffect(() => {
    const handleEnter = (e) => {
      console.log("Search: ", search);
      console.log("Value: ", value);
      if (e.key === "Enter" && combobox.dropdownOpened) {
        if (!exactOptionMatch && filteredOptions.length === 0) {
          // If no match is found and no choices exist in the dropdown (ex: done filtering through whole list)
          // Then --> create new list option
          const newOption = {
            value: normalizedSearch.replace(/\s+/g, "_"),
            label: search,
          };
          setData((current) => [...current, newOption]); // Append new list option to array of data
          onChange(newOption.label);
          setSearch(newOption.label);
        } else if (filteredOptions.length > 0) {
          const selected = filteredOptions[0]; // Select top option of displayed dropdown choices
          onChange(selected.label);
          setSearch(selected.label);
        }

        combobox.closeDropdown();
        e.preventDefault();
      }
    };

    const input = inputRef.current;
    input?.addEventListener("keydown", handleEnter);
    return () => input?.removeEventListener("keydown", handleEnter);
  }, [search, filteredOptions, exactOptionMatch]);

  return (
    <Combobox
      store={combobox}
      withinPortal={true}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          const newOption = {
            value: normalizedSearch.replace(/\s+/g, "_"),
            label: search,
          };
          setData((current) => [...current, newOption]);
          onChange(newOption.label);
          setSearch(newOption.label);
        } else {
          const selected = data.find((d) => d.value === val);
          onChange(val);
          setSearch(selected?.label ?? val);
        }

        combobox.closeDropdown();
        setShowAllOnOpen(false);
      }}
    >
      <Combobox.Target>
        <InputBase
          ref={inputRef}
          rightSection={
            value ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  setSearch("");
                  combobox.resetSelectedOption();
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "#aaa",
                }}
                aria-label="Clear selection"
              >
                ✕
              </button>
            ) : (
              <Combobox.Chevron />
            )
          }
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
            setShowAllOnOpen(false);
          }}
          onClick={() => {
            setShowAllOnOpen(true);
            combobox.openDropdown();

            if (inputRef.current) {
              inputRef.current.select(); // Select all text for overwrite on typing
            }
          }}
          onFocus={() => {
            // optional: same as click
            setShowAllOnOpen(true);
            combobox.openDropdown();
          }}
          onBlur={() => {
            combobox.closeDropdown();
            const selected = data.find((d) => d.value === value);
            setSearch(selected?.label || "");
            setShowAllOnOpen(false);
          }}
          label={label}
          placeholder={placeholder}
          rightSectionPointerEvents="auto"
          required
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options
          style={{
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {options}
          {!exactOptionMatch &&
            normalizedSearch.length > 0 &&
            !showAllOnOpen && (
              <Combobox.Option value="$create">
                + Create "{search}"
              </Combobox.Option>
            )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
