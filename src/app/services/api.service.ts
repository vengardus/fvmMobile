import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'multipart/form-data'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url = 'http://127.0.0.1/demopvta/api/';
  url = 'https://ismytv.webcindario.com/api/'
  apiKey = '1d957976';

  constructor(
    private http: HttpClient    ) { }

  getCatalog(catalog: string) {
    let urlFull = `${this.url}?cat=${encodeURI(catalog)}&apikey=${this.apiKey}`;
    console.log('GET', urlFull);
    return this.http.get(urlFull)
      .pipe(
        map(results => {
          console.log('result http:', results);
          console.log('response:', results['response']);
          console.log('data', results['data']);
          return results;
        }),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log('Error:', errorMessage);
    return throwError(errorMessage);
  };

  login(username: string, password: string) {
    let urlFull = this.url + 'p/login.php';
    let data = {
      'login':username,
      'password':password
    };
    let postData = new FormData();
    postData.append('login' , username);
    postData.append('password' , password);
    console.log(urlFull);
    return this.http.post(urlFull, postData );
  }

  getConfig() {
    return this.getCatalog('art');
  }

}

