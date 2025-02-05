import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, pipe } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})


export class DataService {

    //private users;
    private url = "http://localhost:5000"
    constructor(private http: HttpClient) {

    }

    addNewUsers(users) {
        console.log(users);
        return this.http.post<any>(this.url + "/user/addNewUser", users);
    }

    login(emailId: string, password: string): Observable<any> {
        console.log({ emailId, password });
        return this.http.post<any>(this.url+ "/user/login", { emailId, password });
      }

     /*  getProtectedData() {
        const token = localStorage.getItem('jwtToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
        return this.http.get<any>(this.apiUrl, { headers });
      } */

}