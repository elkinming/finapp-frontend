import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateTransactionResponse, Transaction, TransactionListResponse } from '../interfaces/HttpResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  urlTransactionAPI = environment.transactionAPI;

  constructor(
    private http: HttpClient
  ) { }

  getTransactions(uuid_budget: string): Observable<TransactionListResponse> {
    return this.http.get<any>(this.urlTransactionAPI + `/budget/${uuid_budget}/transactions`);
  }

  createTransaction(transaction: Transaction): Observable<CreateTransactionResponse> {
    return this.http.post<any>(this.urlTransactionAPI + `/budget/${transaction.uuid_budget}/transaction`, transaction);
  }

}
