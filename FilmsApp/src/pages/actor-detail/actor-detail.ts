import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ActorService } from '../../providers/actor-service/actor-service';
import { Actor } from '../../shared/actor';
import { Actors } from '../actors/actors';
/**
 * Generated class for the ActorDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-actor-detail',
  templateUrl: 'actor-detail.html',
})
export class ActorDetail implements OnInit{

  private actor: Actor; //actor to display in the inputs
  private error: string; //save the message of the service.

  constructor(public navCtrl: NavController, public navParams: NavParams, private actorService: ActorService, public alertCtrl: AlertController) {
    this.actor = navParams.get('paramactor');
  }

  ngOnInit(): void {
  }

  create(actor: Actor): void {
    if(actor.name != "" && actor.year != null){
      this.actorService.insert(actor)
      .then((message) => {
        let array = JSON.parse(message);
        for (let a of array) {
          if(a != null){
            this.error = a.msg;
            if(this.error == "Actor not added"){
              this.error = "Actor exists! (Repeated primary key)"
            }
          }else
            this.error = "Error with server"
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


  save(actor: Actor): void {
    if(actor.name != "" && actor.year != null){
      this.actorService.update(actor, actor.name)
        .then((message) => {
          let array = JSON.parse(message);
          for (let a of array) {
            if(a != null){
              this.error = a.msg;
              if(this.error == "Actor not modified."){
                this.error = "Actor not found..."
              }
            }else
              this.error = "Error with server"
            this.showAlert();
          }
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


  delete(actor: Actor): void {
    if(actor.name != ""){
      this.actorService.delete(actor)
      .then((message) => {
        let array = JSON.parse(message);
        for (let a of array) {
          if(a != null){
            this.error = a.msg;
            if(this.error == "Actor not removed"){
              this.error = "Actor not found..."
            }
          }else{
            this.error = "Error with server"
          }
          this.showAlert();
        }
      })
      .catch(error => {
        this.error = error;
        if(this.error != ""){
          this.error = "Error with server";
          this.showAlert();
        }
      });
    }else{
      this.error = "Name is required";
      this.showAlert();
    }
  }

  goBack(): void {
      this.navCtrl.setRoot(Actors, {}, {animate: true, direction: 'back'})
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: this.error,
      buttons: ['OK']
    });
    alert.present();
  }

}
