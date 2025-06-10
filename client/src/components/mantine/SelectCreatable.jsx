import { useState, useEffect, useRef } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";

export default function SelectCreatable({
  label,
  placeholder,
  listOptions,
  onBlur,
}) {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setShowAllOnOpen(false);
    },
  });

  const [data, setData] = useState(listOptions);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [showAllOnOpen, setShowAllOnOpen] = useState(false);
  const inputRef = useRef();

  // Case-insensitive match
  const normalizedSearch = search.trim().toLowerCase();
  const exactOptionMatch = data.some(
    (item) => item.label.toLowerCase() === normalizedSearch
  );

  // Show all options if showAllOnOpen=true, else filter normally
  const filteredOptions = showAllOnOpen
    ? data
    : data.filter((item) =>
        item.label.toLowerCase().includes(normalizedSearch)
      );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  // Select first match on Enter key
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && combobox.dropdownOpened) {
        if (!exactOptionMatch && normalizedSearch.length > 0) {
          const newOption = {
            value: normalizedSearch.replace(/\s+/g, "_"),
            label: search,
          };
          setData((current) => [...current, newOption]);
          setValue(newOption.value);
          setSearch(newOption.label);
        } else if (filteredOptions.length > 0) {
          const selected = filteredOptions[0];
          setValue(selected.value);
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
          setValue(newOption.value);
          setSearch(newOption.label);
        } else {
          const selected = data.find((d) => d.value === val);
          setValue(val);
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
                  setValue("");
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
