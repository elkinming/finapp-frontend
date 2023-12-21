import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/components/login/login.component';
import { BudgetListComponent } from './view/components/budget-list/budget-list.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { BudgetFormComponent } from './view/components/budget-form/budget-form.component';
import { TransactionListComponent } from './view/components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './view/components/transaction-form/transaction-form.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "budget-list",
    component: BudgetListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "budget-form",
    component: BudgetFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "budget-transactions",
    component: TransactionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "transaction-form",
    component: TransactionFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
