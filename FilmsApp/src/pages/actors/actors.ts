import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActorService } from "../../providers/actor-service/actor-service";
import { Actor } from "../../shared/actor";
import { ActorDetail } from "../actor-detail/actor-detail";

/**
 * Generated class for the Actors page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-actors',
  templateUrl: 'actors.html',
})
export class Actors implements OnInit{

  private actors: Actor[];
  private selectedActor: Actor;
  private error: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actorService: ActorService) {
  }

  ngOnInit(){
    this.getActors();
  }


  getActors(): void{
    this.actorService.getAllActors().then((actors) => {this.actors = actors; this.error = "without";})
    .catch(error => this.error = error);
  }


  onSelect(actor: Actor): void{
    this.selectedActor = actor;
  }


  gotoDetail(actor: Actor): void{
    this.navCtrl.push(ActorDetail, { paramactor: actor });
  }


  doRefresh(refresher) {
    setTimeout(() => {
      this.getActors();
      refresher.complete();
    }, 1000);
  }

}
