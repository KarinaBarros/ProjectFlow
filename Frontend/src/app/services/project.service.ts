import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  getUserProjects(): Observable <any>{
    return this.http.get(`${environment.apiUrl}Projects/my`);
  }

  createProject(data:object): Observable <any> {
    return this.http.post(`${environment.apiUrl}Projects`, data)
  }

  updateProject(projectId:number, data:object): Observable<any> {
    return this.http.put(`${environment.apiUrl}Projects/${projectId}`, data);
  }

  deleteProject(projectId:number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}Projects/${projectId}`);
  }

}

