import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { ADD_INGREDIENT, ADD_INGREDIENTS, DELETE_INGREDIENT, START_EDIT, STOP_EDIT, UPDATE_INGREDIENT } from "./shopping.constants";

import * as shoppingListActions from './shooping.actions'


//TODO Global interface for the app.
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State
}


const initialState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10),
  ],

  editedIngredient: null,
  editedIngredientIndex: -1
}


export function shoppingListReducre(state = initialState, action: shoppingListActions.shoppingListActions) {
  switch (action.type) {
    case ADD_INGREDIENT:
      //TODO you must return new value with the olde value because state is immutable.
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };


    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      //TODO remeber data are immutable in ngrx that's why we must return new value
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      }
      //Todo now we need array for all ingredients including the updatedIngredient
      const updatedIngredients = [...state.ingredients] //all ingredients
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient; //TODO override the updated one
      return {
        ...state,
        //TODO return the new arr with the edited ingredient
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case DELETE_INGREDIENT:
      return {
        ...state,
        //TODO return the ingredients without the one i am passing its index using filter HOFs.
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };

    case STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state

  }
}
