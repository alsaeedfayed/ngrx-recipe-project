import { Action } from "@ngrx/store";
import { ADD_INGREDIENT, ADD_INGREDIENTS, DELETE_INGREDIENT, START_EDIT, STOP_EDIT, UPDATE_INGREDIENT } from "./shopping.constants";
import { Ingredient } from "src/app/shared/ingredient.model";

export class AddIngredient implements Action {

  readonly type = ADD_INGREDIENT;
  //payload : Ingredient

  constructor(public payload: Ingredient) {
    // this.payload = payload;
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {
    // this.payload = payload;
  }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  // constructor(public payload: number) {
  // }
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {
  }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}


export type shoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit
