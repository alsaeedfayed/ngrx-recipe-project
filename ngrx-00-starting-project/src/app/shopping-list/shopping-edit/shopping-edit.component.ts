import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shooping.actions';
import * as fromShoppingList from '../store/shopping.reducer'
import * as fromApp from '../../global-store/app.reducer'
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.subscription=  this.store.select('shoppingList').subscribe(storeData => {
      if (storeData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = storeData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      else {
        this.editMode = false
      }
    })


    // this.subscription = this.slService.startedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    //     }
    //   );
  }

  onSubmit(form: NgForm) {


    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new shoppingListActions.UpdateIngredient(newIngredient));
      //this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {

      //TODO ADD INGREDIENT TO THE STORE
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
      //this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;

    this.store.dispatch(new shoppingListActions.StopEdit())
  }

  onDelete() {
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit())

  }

}
