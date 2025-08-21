import { Pipe, PipeTransform } from '@angular/core';

// Pipes in Angular are simple functions that transform data in templates.
// They are used with the | (pipe) character in HTML
// Pipes help format, filter or transform values before displaying them to the user.
// Aside from built-in pies (like date, uppercase), we can create our own custom pipes.

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  /**
   * The transform method is called whenever the pipe is used in a template.
   * @param value - The input string to be shortened.
   * @param length - Optional parameter for the number of characters to keep (default is 3).
   * @returns The shortened string, followed by "..."
   */
  transform(value: string, length?: number): string {
    // Take the first 'length' characters (or 3 if not provided) and add "..."
    return `${value.slice(0, length || 3)}...`;
  }
}
