import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/interfaces/HttpResponse.interface';
import { BudgetService } from 'src/app/services/budget.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent {

  budgets: Budget[] = [];

  constructor(
    private budgetService: BudgetService,
    private toastService: ToastService,
    private router: Router,
    private dataService: DataService
  ) {
    this.loadBudgets();
  }

  gotoBudgetDetails(budget: Budget){
    this.dataService.budgetSelected = budget;
    this.router.navigateByUrl('budget-transactions');
  }

  gotoBudgetForm(){
    this.router.navigateByUrl('/budget-form');
  }

  loadBudgets(){
    this.budgetService.getBudgets().subscribe({
      next: (response) => {
        console.log(response);
        this.budgets = response.budgets;
        this.toastService.show('Budgets loaded', 'success')
      },
      error: (error) => {
        this.budgets = [];
        this.toastService.show('Error loading budgets, please try again', 'danger')
      }
    })
  }


}
