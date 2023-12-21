import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Budget } from 'src/app/interfaces/HttpResponse.interface';
import { BudgetService } from 'src/app/services/budget.service';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent {

  budgetForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    value: new FormControl(0, [Validators.required])
  });

  constructor(
    private router: Router,
    private budgetService: BudgetService,
    private dataService: DataService,
    private toastService: ToastService
  ) { }

  gotoBudgetList(){
    this.router.navigateByUrl('/budget-list');
  }

  onSubmit(){
    if (this.budgetForm.invalid) {
      this.budgetForm.markAllAsTouched();
      return;
    }

    const newBudget: Budget = {
      uuid_budget: '',
      uuid_user: this.dataService.userLogged!.uuid_user,
      description: this.budgetForm.controls['description'].value as string,
      value: this.budgetForm.controls['value'].value as number
    };

    this.budgetService.createBudget(newBudget).subscribe({
      next: (response) => {
        // this.toastService.show('Budget Created', 'success');
        this.router.navigateByUrl('/budget-list');
      },
      error: (error) => {
        this.toastService.show('Error creating budget, please try again', 'danger')
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
