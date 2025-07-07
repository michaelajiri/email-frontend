import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ActivationComponent } from './pages/activation/activation.component';
import { ActivationEmailComponent } from './pages/activation-email/activation-email.component';
import { AppRoutingModule } from './app-routing.module';
import { PaymentInvoiceComponent } from './pages/payment-invoice/payment-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivationComponent,
    ActivationEmailComponent,
    PaymentInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
