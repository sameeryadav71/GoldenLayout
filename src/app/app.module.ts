import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import * as $ from 'jquery';
import { AppRoutingModule } from './app-routing.module';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { Panel1Component } from './panel1/panel1.component';
import { Panel2Component } from './panel2/panel2.component';
import { Panel3Component } from './panel3/panel3.component';


// It is required to have JQuery as global in the window object.
window['$'] = $;

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    Panel1Component,
    Panel2Component,
    Panel3Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent, SearchbarComponent, Panel1Component , Panel2Component, Panel3Component] // reg entryComponents
})
export class AppModule { }
