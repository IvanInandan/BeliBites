import { Button, Modal } from "@mantine/core";
import { useDisclosure, useRadialMove } from "@mantine/hooks";
import CreateRecipeForm from "./CreateRecipeForm";
import RecipeCard from "../mantine/RecipeCard";
import { useNavigate } from "react-router-dom";

// Import custom hooks
import { useRecipes } from "../../hooks/useRecipes";

const Recipes = () => {
  //const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const { recipeQuery, removeRecipe } = useRecipes();

  if (recipeQuery.isLoading) {
    return <div>Loading recipes...</div>;
  }

  if (recipeQuery.isError) {
    return <div>Error: {recipeQuery.error.message}</div>;
  }

  const recipes = recipeQuery.data.recipes;

  const deleteRecipe = (recipe) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      removeRecipe.mutate(recipe.id);
    }
  };

  return (
    <div>
      <p className="text-7xl">Here are your recipes chef!</p>

      <div className="flex flex-wrap items-center">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="p-10 min-w-min max-w-xs">
            <RecipeCard recipe={recipe} onDelete={() => deleteRecipe(recipe)} />
          </div>
        ))}
      </div>

      {/* <Modal
        zIndex={1000}
        styles={{
          header: {
            padding: "10px",
            margin: 0,
            height: 0,
            minHeight: 0,
          },
          title: {
            display: "none",
          },
          modal: {
            borderRadius: "3rem",
          },
        }}
        closeButtonProps={{
          style: {
            top: 10,
            right: 10,
            position: "absolute",
          },
        }}
        size="50%"
        opened={opened}
        onClose={close}
        centered
      >
        <CreateRecipeForm close={close} />
      </Modal> */}

      <Button
        variant="default"
        onClick={() => {
          navigate("/recipes/add");
        }}
        style={{ border: "1px solid #174dc4" }}
      >
        Add a recipe
      </Button>
    </div>
  );
};

export default Recipes;
