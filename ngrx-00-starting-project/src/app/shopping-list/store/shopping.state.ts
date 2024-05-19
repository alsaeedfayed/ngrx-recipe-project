import { Ingredient } from "src/app/shared/ingredient.model";

export interface ShoppinglistState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
