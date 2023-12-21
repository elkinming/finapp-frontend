import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/interfaces/HttpResponse.interface';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {

  transactions: Transaction[] = [];
  balance = 0;

  constructor(
    private router: Router,
    private dataService: DataService,
    private transactionService: TransactionService,
    private toastService: ToastService
  ) {
    this.loadTransactions();
  }

  gotoBudgetList(){
    this.router.navigateByUrl('/budget-list');
  }

  gotoTransactionForm(){
    this.router.navigateByUrl('/transaction-form');
  }

  get budget(){
    return this.dataService.budgetSelected
  }

  loadTransactions(){
    this.transactionService.getTransactions(this.budget?.uuid_budget as string).subscribe({
      next: (response) => {
        console.log(response);
        this.transactions = response.transactions;
        this.toastService.show('Transactions loaded', 'success');
        this.getBalance();
      },
      error: (error) => {
        this.transactions = [];
        this.toastService.show('Error loading transactions, please try again', 'danger')
      }
    })
  }

  getBalance(){
    this.balance = this.budget.value;
    this.transactions.forEach((transaction) => {
      this.balance = this.balance - transaction.value;
    })
  }

}
