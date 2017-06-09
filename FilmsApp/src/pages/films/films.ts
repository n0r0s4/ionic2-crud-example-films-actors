import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FilmService } from "../../providers/film-service/film-service";
import { Film } from "../../shared/film";
import { FilmDetail } from "../film-detail/film-detail";

/**
 * Generated class for the Films page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-films',
  templateUrl: 'films.html',
})
export class Films implements OnInit{

  private films: Film[];
  private selectedFilm: Film;
  private error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public filmService: FilmService) {
  }

  ngOnInit(){
    this.getFilms();
  }

  getFilms(): void{//todo catch
    this.filmService.getAllFilms().then((films) => {this.films = films; this.error = "no";})
    .catch(error => this.error = error);
  }

  onSelect(film: Film): void{
    this.selectedFilm = film;
  }


  gotoDetail(film: Film): void{
    this.navCtrl.push(FilmDetail, { paramfilm: film });
  }


  doRefresh(refresher) {
    setTimeout(() => {
      this.getFilms();
      refresher.complete();
    }, 1000);
  }

}//end films
