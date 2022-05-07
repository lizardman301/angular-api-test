import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'angular-api-test';
  public active = "1";

  constructor(public route: ActivatedRoute){};

  // The app component is just use as the "home" or "parent" component for the rest of the app
  // NavBar and routerOutlet exists here and will display the other components
}
