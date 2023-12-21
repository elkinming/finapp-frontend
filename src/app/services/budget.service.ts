import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Budget, BudgetListResponse, CreateBudgetResponse } from '../interfaces/HttpResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  urlBudgetAPI = environment.budgetAPI;

  constructor(
    private http: HttpClient
  ) { }

  getBudgets(): Observable<BudgetListResponse> {
    return this.http.get<any>(this.urlBudgetAPI + "/budget/list", { });
  }

  createBudget(budget: Budget): Observable<CreateBudgetResponse> {
    return this.http.post<any>(this.urlBudgetAPI + "/budget", budget);
  }

}
