import { NgModule } from '@angular/core';
import { UserDetails } from './user-details.component';
import { UsersList } from './users.component';

// Feature Module
@NgModule({
  declarations: [UsersList], // we add all the NONstandalone components
  imports: [UserDetails], // we add all the standalone components
  providers: [],
  exports: [],
})
export class UsersModule {}
