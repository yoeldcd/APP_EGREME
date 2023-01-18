import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producer } from '../models/producer.model';

// base URL host and port depends of django service host
const baseUrl = `http://localhost:8000/api/producer`;

@Injectable({
  providedIn: 'root',
})
export class ProducerService {
  constructor(private http: HttpClient) {}

  // define service to fethc all producer instance
  getAll(): Observable<Producer[]> {
    return this.http.get<Producer[]>(`${baseUrl}/list/`);
  }

  // define service to create a producer instance
  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/post/`, data);
  }

  // define service to fethc one specific producer instance
  get(id: any): Observable<Producer> {
    return this.http.get<Producer>(`${baseUrl}/get/${id}`);
  }

  // define service to update one specific producer instance
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update/${id}`, data);
  }

  // define service to remove one specific producer instance
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`);
  }

  // define service to delete all producer instances
  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/all`);
  }
}
