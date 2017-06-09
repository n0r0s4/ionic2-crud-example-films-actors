import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Actor } from "../../shared/actor";

/*
  Generated class for the ActorServiceProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ActorService {

  private urlActorService =
  'http://provenapps.cat:8080/actorfilmservice/services/actor';

  constructor(private http: Http) { }

  getAllActors() : Promise<Actor[]> {
    const url = `${this.urlActorService}/find_all`;
    return this.http.get(url)
           .toPromise()
           .then(response => response.json() as Actor[])
           .catch(error => this.handleError);
  }

  insert(actor: Actor): Promise<string> {
     const url = `${this.urlActorService}/insert`;
    //set query parameters from form data
     const body = new URLSearchParams();
     body.set('name', actor.name);
     body.set('year', actor.year.toString());
     let requestOptions = new RequestOptions();
     requestOptions.search = body;
    //send request
    return this.http
      .get(url, requestOptions)
      .toPromise()
      .then(response => response.text() as string)
      .catch(error => this.handleError);
  }

  delete(actor: Actor): Promise<string> {
    const url = `${this.urlActorService}/remove`;
    //set query parameters from form data
     const body = new URLSearchParams();
     body.set('name', actor.name);
     let requestOptions = new RequestOptions();
     requestOptions.search = body;
    //send request
    return this.http
      .get(url, requestOptions)
      .toPromise()
      .then(response => response.text())
      .catch(error => this.handleError);
  }

   update(actor: Actor, oldName: string): Promise<string> {
     const url = `${this.urlActorService}/update`;
     //set query parameters from form data
      const body = new URLSearchParams();
      body.set('oldName', oldName);
      body.set('name', actor.name);
      body.set('year', actor.year.toString());
      let requestOptions = new RequestOptions();
      requestOptions.search = body;
     //send request
     return this.http
       .get(url, requestOptions)
       .toPromise()
       .then(response => response.text() as string)
       .catch(error => this.handleError);
   }

   private handleError(error: any): Promise<any> {
      console.error('Error with server', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

}
