import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetListComponent } from './components/budget-list/budget-list.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';



@NgModule({
  declarations: [
    LoginComponent,
    BudgetListComponent,
    BudgetFormComponent,
    TransactionListComponent,
    TransactionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginComponent,
    BudgetListComponent,
    BudgetFormComponent,
    TransactionListComponent,
    TransactionFormComponent
  ]
})
export class ViewModule { }
