import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/i-usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  httpClient = inject(HttpClient);

  private baseUrl: string = 'https://peticiones.online/api/users';

  constructor(){}

  getAll(page: number, itemPerPage:number): Observable<IUsuario []>{
    return this.httpClient.get<IUsuario[]>(this.baseUrl + "?page=" + page + "&size=" + itemPerPage);
  }

  getById(_id: string): Observable<IUsuario>{
    return this.httpClient.get<IUsuario>(`${this.baseUrl}/${_id}`);
  }

  insert(user: IUsuario): Observable<IUsuario>{
    return this.httpClient.post<IUsuario>(this.baseUrl, user);
  }

  update(user:IUsuario): Observable<IUsuario>{
    return this.httpClient.put<IUsuario>(this.baseUrl+"/"+user._id, user)
  }

  delete(_id: string): Observable<IUsuario>{
    return this.httpClient.delete<IUsuario>(`${this.baseUrl}/${_id}`);
  }
}
