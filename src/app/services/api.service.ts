import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Globals } from '../config/globals';
import { TOConfig } from '../models/to/TOconfig';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'multipart/form-data'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = Globals.HOSTING_SERVER;
  apiKey = '1d957976';
  message = '';

  constructor(
    private http: HttpClient    ) { }

  setIpServer(oTOConfig:TOConfig) {
    if ( oTOConfig == null ) {
      if ( Globals.MODO_SERVER == Globals.MODO_HOSTING )
        this.url = Globals.HOSTING_SERVER;
      else
        this.url = Globals.LOCAL_SERVER;
    }
    else {
      if ( oTOConfig.getIsHostingServer() )
        this.url = (oTOConfig.getIpServer_edit().trim().length>0)? oTOConfig.getIpServer_edit() : Globals.HOSTING_SERVER;
      else
        this.url = (oTOConfig.getIpServer_edit().trim().length>0)? oTOConfig.getIpServer_edit() : Globals.LOCAL_SERVER;
    }
  }

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

  async sendPedido(pedido):Promise<any> {
    let urlFull = this.url + 'p/pedidos.php';
    console.log(urlFull);
    let postData = new FormData();
    postData.append('pedido' , JSON.stringify(pedido));
    console.log(postData);
    try {
      let res = await this.http.post(urlFull, postData).toPromise();
      return res;
    }
    catch (err) {
      this.message = `Ocurrió un error: ${err.message}`;
      return null;
    }
  }
}

