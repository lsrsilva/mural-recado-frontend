import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../interfaces/message';
import {ENVIRONMENT} from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(`${this.getURI()}`);
  }

  save(message: Message): Observable<any> {
    return this.http.post<any>(`${this.getURI()}`, message);
  }

  update(message: Message): Observable<any> {
    return this.http.put<any>(`${this.getURI()}/${message.id}`, message);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.getURI()}/${id}`);
  }

  getURI(): string {
    return `${ENVIRONMENT.API_URL}/messages`;
  }
}
