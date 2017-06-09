import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FilmService } from '../../providers/film-service/film-service';
import { Film } from '../../shared/film';
import { Films } from '../films/films';

/**
 * Generated class for the FilmDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-film-detail',
  templateUrl: 'film-detail.html',
})
export class FilmDetail implements OnInit{

  private film: Film;
  private error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actorService: FilmService, public alertCtrl: AlertController) {
    this.film = navParams.get('paramfilm');
  }


  ngOnInit(): void {
  }


    create(film: Film): void {
      if(film.title != "" && film.director != "" && film.description != "" && film.year != null){
        this.actorService.insert(film)
        .then((message) => {
          let array = JSON.parse(message);
          for (let a of array) {
            if(a != null){
              this.error = a.msg;
              if(this.error == "Film not added"){
                this.error = "Film exists! (Repeated primary key)"
              }
            }else{
              this.error = "Error with server"
            }
          }
          this.showAlert();
        })
        .catch(error => {
          this.error = error;
          if(this.error != ""){
            this.error = "Error with server";
            this.showAlert();
          }
        });
      }else{
        this.error = "Fields are required";
        this.showAlert();
      }
    }

  save(film: Film): void {
    if(film.title != "" && film.director != "" && film.description != "" && film.year != null){
      this.actorService.update(film, film.title)
        .then((message) => {
          let array = JSON.parse(message);
          for (let a of array) {
            if(a != null){
              this.error = a.msg;
              if(this.error == "Film not modified."){
                this.error = "Film not found..."
              }
            }else{
              this.error = "Error with server"
            }
          }
          this.showAlert();
        })
        .catch(error => {
          this.error = error;
          if(this.error != ""){
            this.error = "Error with server";
            this.showAlert();
          }
        });
    }else{
      this.error = "Fields are required";
      this.showAlert();
    }
  }


  delete(film: Film): void {
    if(film.title != ""){
      this.actorService.delete(film)
      .then((message) => {
        let array = JSON.parse(message);
        for (let a of array) {
          if(a != null){
            this.error = a.msg;
            if(this.error == "Error deleting film"){
              this.error = "Film not found"
            }
          }else{
            this.error = "Error with server"
          }
        }
        this.showAlert();
      })
      .catch(error => {
        this.error = error;
        if(this.error != ""){
          this.error = "Error with server";
          this.showAlert();
        }
      });
    }else{
      this.error = "Title required";
      this.showAlert();
    }
  }


    goBack(): void {
      this.navCtrl.setRoot(Films, {}, {animate: true, direction: 'back'})
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: this.error,
      buttons: ['OK']
    });
    alert.present();
  }

  arrowClick(): void{
    console.log("back");
  }

}
