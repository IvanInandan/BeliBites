import { Checkbox, UnstyledButton } from "@mantine/core";
import classes from "./Checkbox.module.scss";

export default function CheckboxCard({ text, value, onChange }) {
  const isChecked = value === "public"; // check box checked if visiblity is public

  const handleToggle = () => {
    onChange(isChecked ? "private" : "public");
  };

  return (
    <UnstyledButton onClick={handleToggle} className={classes.button}>
      <div className="flex justify-center items-center">
        <Checkbox
          checked={isChecked}
          onChange={() => {}}
          tabIndex={-1}
          size="md"
          mr="xl"
          styles={{ input: { cursor: "pointer" } }}
          aria-hidden
        />

        <p>{text}</p>
      </div>
    </UnstyledButton>
  );
}
