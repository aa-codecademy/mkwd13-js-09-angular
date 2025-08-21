import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../feature/users/models/user-model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * The transform method is called whenever the pipe is used in a template.
   * @param value - The input array of User objects.
   * @param searchValue - The string to filter user names by.
   * @returns A filtered array of users whose names include the search value.
   */
  transform(value: User[], searchValue: string): User[] {
    // Filter users by checking if their name includes the search value (case-insensitive).
    const filteredUsers = value.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLocaleLowerCase().trim())
    );

    return filteredUsers;
  }
}
