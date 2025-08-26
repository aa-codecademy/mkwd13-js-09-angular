import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { UsersModule } from '../users/users.module';
import { App } from './app';

@NgModule({
  declarations: [App], // all (non-standalone) components + directives
  imports: [BrowserModule, UsersModule], // all modules
  providers: [provideBrowserGlobalErrorListeners()], // all services + pipes
  exports: [], // all services which we want to be accessible upon module import
  bootstrap: [App], // used only in App Module to determine main component
})
export class AppModule {}
