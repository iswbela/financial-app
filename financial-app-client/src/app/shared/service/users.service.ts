import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError as observableThrowError, catchError, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class UsersService {
    private apiUrl = 'http://localhost:8080/users';

    constructor(private http: HttpClient) { }

    createUser(user: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
        return this.http.post(
            this.apiUrl + '/create', user, 
            { headers, observe: 'response' })
            .pipe(map(this.processReturn),
            catchError(this.handleError));
    }   

    private processReturn(response: HttpResponse<any>){
        if(response.status < 200 || response.status >= 300){
            throw new Error('erro');
        }
        return response;
    }

    private handleError(error: any){
        console.error(error);
        if(!error.message){
            error.message = 'error';
        }
        return observableThrowError(error);
    }

    getUserById(userId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getUserById?userId=${userId}`);
    }

}