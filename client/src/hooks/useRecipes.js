import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import recipeService from "../services/recipe";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useRecipes = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all recipes
  const recipeQuery = useQuery({
    queryKey: ["recipes"],
    queryFn: recipeService.getAllRecipes,
  });

  // Create recipe mutation
  const addRecipe = useMutation({
    mutationFn: recipeService.createRecipe,

    onSuccess: (newRecipe) => {
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });

      toast.success("Recipe successfully added to your cook book!");
      navigate("/recipes");
    },

    onError: (error) => {
      console.error("Failed to create recipe: ", error);
      toast.error("Failed to add recipe. Please try again");
    },
  });

  const removeRecipe = useMutation({
    mutationFn: recipeService.deleteRecipe,

    onSuccess: (deletedRecipe) => {
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });

      toast.success("Recipe successfully removed from your cook book!");
    },

    onError: (error) => {
      console.error("Failed to delete recipe: ", error);
      toast.error("Failed to delete recipe. Please try again");
    },
  });

  return {
    recipeQuery,
    addRecipe,
    removeRecipe,
  };
};
