import { IconChevronRight } from "@tabler/icons-react";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "./UserButton.module.scss";
import { useSelector } from "react-redux";
import zeffAvatar from "../../assets/zeff.jpg";

export default function UserButton() {
  const user = useSelector((state) => state.user);
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={zeffAvatar} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.username}
          </Text>

          <Text c="dimmed" size="xs">
            {user.email}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
