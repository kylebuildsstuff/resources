import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { addCoinReducer } from './blockchain/blockchain.reducers';
import { DisplayComponent } from './display/display.component';

@NgModule({
  declarations: [AppComponent, BlockchainComponent, DisplayComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ blockchain: addCoinReducer }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
