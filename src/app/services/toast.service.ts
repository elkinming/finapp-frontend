import { Injectable } from '@angular/core';


export interface ToastInfo {
  header?: string;
  classname: string;
  body: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(

  ) { }

  toasts: ToastInfo[] = [];

  show(body: string, classname: string) {
    this.toasts.push({ body, classname: 'alert alert-' + classname });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
