import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducre } from './shopping-list/store/shopping.reducer';
import { authReducer } from './auth/store/auth.reducer';
import * as fromApp from './global-store/app.reducer'
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducers)
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
