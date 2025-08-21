import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appToggleAddress]',
})
export class ToggleAddressDirective implements OnInit {
  private elementRef = inject(ElementRef);

  // 'input' allows passing a value from the parent component to the directive.
  isInitiallyOpen = input(false);

  // Reference to the address details HTML element inside the host element.
  addressDetailsEl: HTMLDivElement;

  isOpen = false;

  ngOnInit(): void {
    this.isOpen = this.isInitiallyOpen();

    this.addressDetailsEl =
      this.elementRef.nativeElement.querySelector('.address-details');

    this.addressDetailsEl.style.overflow = 'hidden';
    this.addressDetailsEl.style.transition = '0.2s ease-in';

    this.addressDetailsEl.style.maxHeight = this.isOpen ? '50px' : '0px';
  }

  // If the clicked element is an <h3>, it toggles the visibility of the address details.
  @HostListener('click', ['$event']) onClick(event: Event) {
    const target = event.target as HTMLElement;

    // Only toggle if the clicked is an <h3>.
    if (target.tagName !== 'H3') return;

    // Toggle the open/closed state
    this.isOpen = !this.isOpen;

    this.addressDetailsEl.style.maxHeight = this.isOpen ? '50px' : '0px';
  }
}
