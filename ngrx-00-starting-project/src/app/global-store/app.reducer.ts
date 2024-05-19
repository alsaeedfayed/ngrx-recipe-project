import * as fromShoppingListReducers from '../shopping-list/store/shopping.reducer';
import * as fromAuthReducers from '../auth/store/auth.reducer';
import * as fromShoppingState from '../shopping-list/store/shopping.state';
import * as fromAuthState from '../auth/store/auth.state'
import { ActionReducerMap } from '@ngrx/store';

//TODO collect all states for the app
export interface AppState {
  shoppingList: fromShoppingState.ShoppinglistState;
  auth: fromAuthState.AuthState
}

//TODO collect all reducers for the app
export const appReducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingListReducers.shoppingListReducre,
  auth: fromAuthReducers.authReducer
}
