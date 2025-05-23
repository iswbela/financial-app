import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError as observableThrowError, catchError, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Transaction } from "../model/Transaction";

@Injectable()
export class TransactionsService {
    private apiUrl = 'http://localhost:8080/transaction';

    constructor(private http: HttpClient) { }

    getBalanceByUser(userId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getBalanceByUser?userId=${userId}`);
    }

    getTransactionsByUser(userId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getTransactionsByUser?userId=${userId}`);
    }

    createTransaction(transaction: Transaction){
        return this.http.post<any>(`${this.apiUrl}/create`,transaction);
    }
}