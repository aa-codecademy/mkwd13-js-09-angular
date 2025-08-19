import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './core/components/header/header';
import { NotFound } from './core/components/not-found/not-found';
import { About } from './feature/about/about';
import { Home } from './feature/home/home';

@NgModule({
  declarations: [App, Header, NotFound, About, Home],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
