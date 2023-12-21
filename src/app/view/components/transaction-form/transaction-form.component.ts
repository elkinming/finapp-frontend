import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/interfaces/HttpResponse.interface';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent{

  transactionForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    value: new FormControl(0, [Validators.required])
  });

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private dataService: DataService,
    private toastService: ToastService
    ) {

    }

  gotoTransactionList(){
    this.router.navigateByUrl('/budget-transactions');
  }

  onSubmit(){
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    const newTransaction: Transaction = {
      uuid_transaction: '',
      uuid_budget: this.dataService.budgetSelected?.uuid_budget as string,
      uuid_user: this.dataService.userLogged!.uuid_user,
      description: this.transactionForm.controls['description'].value as string,
      value: this.transactionForm.controls['value'].value as number
    };

    this.transactionService.createTransaction(newTransaction).subscribe({
      next: (response) => {
        // this.toastService.show('Budget Created', 'success');
        this.router.navigateByUrl('/budget-transactions');
      },
      error: (error) => {
        this.toastService.show('Error creating transaction, please try again', 'danger')
      }
    })

  }

  public inputValidatorNumbers(event: any) {
    if (event.target.value.length > 20) {
      return (event.target.value == event.target.value.slice(0, 20));
    }
    return event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }

}
