import { Injectable } from '@angular/core';
import { environment } from './environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  sendRequest(apiUrl: string, params: Object) {

    
    return this.httpClient.request('POST', `${environment.hostDomain}${apiUrl}`, {
      body: JSON.stringify(params),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      }

    });
  }
}
