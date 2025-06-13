import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import favoritesService from "../services/favorites";
import { toast } from "react-toastify";

export const useFavorites = ({ userId, recipeId }) => {
  const queryClient = useQueryClient();

  const userFavoritesQuery = useQuery({
    queryKey: ["favorites", userId],
    queryFn: favoritesService.getFavoritesByUser(userId),
    enabled: !!userId,
  });

  const isFavoritedQuery = useQuery({
    queryKey: ["isFavorited", userId, recipeId],
    queryFn: favoritesService.checkIfFavorited(userId, recipeId),
    enabled: !!userId && !!recipeId,
  });

  const favoriteCountQuery = useQuery({
    queryKey: ["favoriteCount", recipeId],
    queryFn: favoritesService.getFavoriteCount(recipeId),
    enabled: !!recipeId,
  });

  const addFavorite = useMutation({
    mutationFn: favoritesService.addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
      queryClient.invalidateQueries({
        queryKey: ["isFavorited", userId, recipeId],
      });
      queryClient.invalidateQueries({ queryKey: ["favoriteCount", recipeId] });
      toast.success("Added to favorites!");
    },
    onError: () => toast.error("Could not add to favorites."),
  });

  const removeFavorite = useMutation({
    mutationFn: favoritesService.removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
      queryClient.invalidateQueries({
        queryKey: ["isFavorited", userId, recipeId],
      });
      queryClient.invalidateQueries({ queryKey: ["favoriteCount", recipeId] });
      toast.success("Removed from favorites!");
    },
    onError: () => toast.error("Could not remove from favorites."),
  });

  return {
    userFavoritesQuery,
    isFavoritedQuery,
    favoriteCountQuery,
    addFavorite,
    removeFavorite,
  };
};
