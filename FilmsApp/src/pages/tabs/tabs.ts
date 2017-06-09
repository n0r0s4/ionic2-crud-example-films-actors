import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { Films } from '../films/films';
import { Actors } from '../actors/actors';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = Films;
  tab3Root = Actors;
  constructor() {}
}
