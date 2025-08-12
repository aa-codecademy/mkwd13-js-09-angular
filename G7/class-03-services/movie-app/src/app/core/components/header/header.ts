import { Component, input, OnInit } from '@angular/core';
import { Logger } from '../../services/logger';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  // another way to inject a service is through the constructor
  constructor(private loggerService: Logger) {}

  title = input();

  ngOnInit(): void {
    this.loggerService.logDetails('Header Component');
  }
}
