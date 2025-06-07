import { SegmentedControl } from "@mantine/core";
import classes from "./Control.module.scss";

export default function GradientSegmentedControl({ value, onChange }) {
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={["Easy", "Medium", "Hard", "Zeff"]}
      value={value}
      onChange={onChange}
      classNames={classes}
    />
  );
}
