import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivationComponent } from './pages/activation/activation.component';
import { ActivationEmailComponent } from './pages/activation-email/activation-email.component';
import { PaymentInvoiceComponent } from './pages/payment-invoice/payment-invoice.component';

const routes: Routes = [
  { path: 'activation-email', component: ActivationEmailComponent },
  { path: 'payment-invoice', component: PaymentInvoiceComponent },
  { path: 'activate', component: ActivationComponent },
  { path: '**', redirectTo: 'activation-email' },
  { path: '**', redirectTo: 'payment-invoice' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
