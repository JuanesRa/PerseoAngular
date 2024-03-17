import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private _location: PlatformLocation) {}

  ngOnInit(): void {
    this._location.onPopState (() => {
      window.location.href = 'http://localhost:4200';
    });
  }

}
