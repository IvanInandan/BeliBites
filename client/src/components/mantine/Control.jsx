import { SegmentedControl } from "@mantine/core";
import classes from "./Control.module.scss";
import { useEffect } from "react";

export default function GradientSegmentedControl({ value, onChange }) {
  const defaultValue = "easy";

  useEffect(() => {
    if (!value) {
      onChange(defaultValue); // Sync with parent state
    }
  }, [value, onChange]);

  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={[
        { label: "Easy", value: "easy" },
        { label: "Medium", value: "medium" },
        { label: "Hard", value: "hard" },
        { label: "Zeff", value: "zeff" },
      ]}
      value={value}
      onChange={onChange}
      classNames={classes}
    />
  );
}
