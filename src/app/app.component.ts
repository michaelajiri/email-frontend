import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailService } from './services/email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  emailDto = {
    recipient: '',
    subject: '',
    content: ''
  };
  response: any;

  constructor(private http: HttpClient, private emailService: EmailService) {}

  onSubmit() {
    const invoiceNumber = 'INV-123456';
    const invoiceDate = new Date().toLocaleDateString();
    const recipientName = 'John Doe';
    const recipientAddress = '123 Elm Street, Springfield';
    const items = [
      { description: 'Product 1', quantity: 2, unitPrice: 50, total: 100 },
      { description: 'Product 2', quantity: 1, unitPrice: 150, total: 150 }
    ];
    const totalAmountDue = items.reduce((sum, item) => sum + item.total, 0);
    const currentYear = new Date().getFullYear();

    // Load the template
    this.http.get('assets/invoice-template.html', { responseType: 'text' })
      .subscribe(template => {
        // Replace placeholders
        let body = template
          .replace('{{invoiceNumber}}', invoiceNumber)
          .replace('{{invoiceDate}}', invoiceDate)
          .replace('{{recipientName}}', recipientName)
          .replace('{{recipientAddress}}', recipientAddress)
          .replace('{{#each items}}', '')
          .replace('{{/each}}', '')
          .replace('{{description}}', items.map(item => item.description).join('</td></tr><tr><td>'))
          .replace('{{quantity}}', items.map(item => item.quantity).join('</td></tr><tr><td>'))
          .replace('{{unitPrice}}', items.map(item => item.unitPrice).join('</td></tr><tr><td>'))
          .replace('{{total}}', items.map(item => item.total).join('</td></tr><tr><td>'))
          .replace('{{totalAmountDue}}', totalAmountDue.toFixed(2))
          .replace('{{currentYear}}', currentYear.toString());

        this.emailDto.content = body;

        // Send the email
        this.emailService.sendEmail(this.emailDto).subscribe(
          (res) => {
            this.response = res;
          },
          (err) => {
            console.error('Error sending email', err);
          }
        );
      });
  }
}
