import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Film } from "../../shared/film";

/*
  Generated class for the FilmServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FilmService {

  private urlActorService =
  'http://provenapps.cat:8080/actorfilmservice/services/film/';

  constructor(public http: Http) {}

  getAllFilms() : Promise<Film[]> {
    const url = `${this.urlActorService}/find_all`;
    return this.http.get(url)
           .toPromise()
           .then(response => response.json() as Film[])
           .catch(error => this.handleError);
  }

   insert(film: Film): Promise<string> {
      const url = `${this.urlActorService}/insert`;
     //set query parameters from form data
      const body = new URLSearchParams();
      body.set('title', film.title);
      body.set('director', film.director);
      body.set('descripcio', film.description);
      body.set('any', film.year.toString());
      let requestOptions = new RequestOptions();
      requestOptions.search = body;
     //send request
     return this.http
       .get(url, requestOptions)
       .toPromise()
       .then(response => response.text() as string)
       .catch(error => this.handleError);
   }

   delete(film: Film): Promise<string> {
     const url = `${this.urlActorService}/remove`;
     //set query parameters from form data
      const body = new URLSearchParams();
      body.set('title', film.title);
      let requestOptions = new RequestOptions();
      requestOptions.search = body;
     //send request
     return this.http
       .get(url, requestOptions)
       .toPromise()
       .then(response => response.text())
       .catch(error => this.handleError);
   }

   update(film: Film, oldTitle: string): Promise<string> {
     const url = `${this.urlActorService}/update`;
     //set query parameters from form data
      const body = new URLSearchParams();
      body.set('oldTitle', oldTitle);
      body.set('title', film.title);
      body.set('director', film.director);
      body.set('descripcio', film.description);
      body.set('any', film.year.toString());
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
      console.error('Error with the server', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

}
