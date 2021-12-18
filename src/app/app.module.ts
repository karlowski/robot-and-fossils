import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardModule } from "./board/board.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
