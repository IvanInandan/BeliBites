import { useSelector } from "react-redux";
import { IconHeart } from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Text,
} from "@mantine/core";
import classes from "./RecipeCard.module.scss";

import { useFavorites } from "../../hooks/useFavorites";

const RecipeCard = ({ recipe, onView, onFavorite, onDelete, onEdit }) => {
  const user = useSelector((state) => state.user);

  const { isFavoritedQuery, favoriteCountQuery, addFavorite, removeFavorite } =
    useFavorites({ userId: user.id, recipeId: recipe.id });

  console.log(user.id, recipe.id);

  const tags = recipe.tags.map((tag) => (
    <Badge variant="light" key={tag}>
      {tag}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {recipe.title}
          </Text>
          <Badge size="sm" variant="light">
            {recipe.difficulty}
          </Badge>
        </Group>
        <Text
          fz="sm"
          mt="xs"
          style={{ whiteSpace: "normal", wordBreak: "break-word" }}
        >
          {recipe.description}
        </Text>
      </Card.Section>

      {tags.length > 0 && (
        <Card.Section className={classes.section}>
          <Group gap={7} mt={15}>
            {tags}
          </Group>
        </Card.Section>
      )}

      <Card.Section className={classes.section}>
        <Group mt="xs">
          <Button radius="md" style={{ flex: 1 }}>
            View recipe
          </Button>
          <ActionIcon
            variant="default"
            radius="md"
            size={36}
            onClick={onFavorite}
          >
            <IconHeart className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1, backgroundColor: "gray" }}>
          Edit
        </Button>

        <Button
          radius="md"
          style={{ flex: 1, backgroundColor: "red" }}
          onClick={() => {
            onDelete(recipe.id);
          }}
        >
          Delete
        </Button>
      </Group>
    </Card>
  );
};

export default RecipeCard;
