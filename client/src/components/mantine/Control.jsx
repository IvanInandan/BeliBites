import { SegmentedControl } from "@mantine/core";
import classes from "./Control.module.scss";

export default function GradientSegmentedControl() {
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={["Easy", "Medium", "Hard", "Zeff"]}
      classNames={classes}
    />
  );
}
