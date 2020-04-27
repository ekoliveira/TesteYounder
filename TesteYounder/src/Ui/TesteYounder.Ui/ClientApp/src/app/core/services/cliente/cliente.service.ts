import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClienteViewModel } from '../../models/cliente-view-model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type':  'application/json'
		})
	}

  constructor(
    private httpClient: HttpClient, 
  ) { }

  getClientes(){
    return this.httpClient.get(environment.serverUrl + 'Cliente');
  }

  postCliente(cliente : ClienteViewModel){
    return this.httpClient.post(environment.serverUrl + 'Cliente', cliente, this.httpOptions);
  }

  putCliente(cliente:ClienteViewModel){
    return this.httpClient.put(environment.serverUrl + 'Cliente', cliente, this.httpOptions);
  }

  deleteCliente(id:number){
    return this.httpClient.delete(environment.serverUrl + 'Cliente/' + id);
  }
  
}
