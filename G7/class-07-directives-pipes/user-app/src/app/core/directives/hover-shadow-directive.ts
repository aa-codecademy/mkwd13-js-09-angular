import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';

// Directives in Angular are classes that add behavior to elements in our Angular application.
// They can change the appearance, behavior or layout of DOM elements.
// There are three of directive: components, structural directives (like *ngIf) and attribute directives (like ngClass).

// This custom attribute adds a shadow effect to the host element when you hover over it.
@Directive({
  selector: '[appHoverShadow]', // This directive is activated by adding the 'appHoverShadow' attribute to an element.
})
export class HoverShadowDirective implements OnInit {
  // ElementRef gives direct access to the DOM element the directive is attached to.
  private elementRef = inject(ElementRef);

  // Renderer2 is Angular's way to safely manipulate DOM elements, attributes, and styles.
  // It works across platforms and helps avoid security issues.
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    console.log('hover shadow directive on init');

    // Example of listening for events using the renderer.listen
    this.renderer.listen(this.elementRef.nativeElement, 'click', () => {
      console.log('element clicked through rendered listener');
    });

    // Example of listening for events Vanilla JS style
    this.elementRef.nativeElement.addEventListener('click', () => {
      console.log('normal vanilla js listener');
    });
  }

  // HostListener is an Angular decorator that lets you listen to evens on the host element.
  // "host element" is the DOM element where the directive is applied.
  // This method runs when the host element is clicked
  @HostListener('click') onClick() {
    console.log('The host element has been clicked');
  }

  // This method runs when the mouse enters the host element.
  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.boxShadow =
      '0 3px 10px rgba(0,0,0,0.5), 0 3px 10px rgba(0,0,0,0.5)';
  }

  // This methods runs when the mouse leaves the host element.
  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.boxShadow = 'none';
  }

  // Summary:
  // Directives let you add custom behavior to elements in Angular.
  // ElementRef gives direct access to the the DOM element.
  // Reneder2 is the recommended way to manipulate the DOM in Angular.
  // HostListener lets you respond to events on the host element.
}
