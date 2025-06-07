import { useState } from "react";
import { Checkbox, Text, UnstyledButton } from "@mantine/core";
import classes from "./Checkbox.module.scss";

export default function CheckboxCard({ text }) {
  const [value, onChange] = useState(true);

  return (
    <UnstyledButton onClick={() => onChange(!value)} className={classes.button}>
      <div className="flex justify-center items-center">
        <Checkbox
          checked={value}
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
