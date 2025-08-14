import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './core/components/header/header';
import { MoviesModule } from './feature/movies/movies-module';

// The @NgModule decorator marks this class as an Angular module.
// Modules help organize our app by grouping related components, services and other code together.
@NgModule({
  // declarations: List all components, directives and pipes that belong to this module.
  declarations: [App, Header],
  // imports: List other modules whose exported classes are needed by component templates, standalone components etc in this module.
  imports: [BrowserModule, AppRoutingModule, MoviesModule],
  // providers in the AppModule are available throughout the entire application.
  // providers in the feature modules are only available within that module's injector scope.
  providers: [provideBrowserGlobalErrorListeners()],
  // bootstrap: The main component that Angular should load when starting the app.
  bootstrap: [App],
})
export class AppModule {}
