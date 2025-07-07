import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment-invoice',
  templateUrl: './payment-invoice.component.html',
  styleUrls: ['./payment-invoice.component.css']
})
export class PaymentInvoiceComponent implements OnInit {

  @ViewChild('invoiceBox', { static: false }) invoiceBox!: ElementRef;

  subject: string = 'Payment Invoice';

  company = {
    name: 'Wealthmarket',
    address: '123 Business Rd, City, Country',
    email: 'support.com'
  };

  invoice = {
    number: 'INV-001',
    date: '07/07/2025',
    status: 'PAID'
  };

  buyer = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+234-801-234-5678'
  };

  items = [
    { description: 'Service A', quantity: 2, unitPrice: 10000 },
    { description: 'Service B', quantity: 1, unitPrice: 15000 }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }

  get vat(): number {
    return this.subtotal * 0.075;
  }

  get total(): number {
    return this.subtotal + this.vat;
  }

  submitInvoice(): void {
    const htmlContent = this.invoiceBox?.nativeElement?.outerHTML || '';
    const receiverEmail = this.buyer.email;

    if (!receiverEmail) {
      alert('Please enter a valid receiver email.');
      return;
    }

    this.authService.sendPaymentInvoice(receiverEmail, this.subject, htmlContent)
      .subscribe({
        next: (res) => {
          console.log('Invoice sent successfully', res);
          alert('Invoice sent successfully!');
        },
        error: (err) => {
          console.error('Failed to send invoice', err);
          alert('Failed to send invoice.');
        }
      });
  }
}