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
  username: string = ''; // Add this field to hold the username
  response: any;

  constructor(private emailService: EmailService, private http: HttpClient) {}

  onSubmit() {
    // Fetch the email template
    this.http.get('assets/email-template.html', { responseType: 'text' }).subscribe(
      (template: string) => {
        const verificationLink = 'https://your-domain.com/verify?token=sample-token';
        const currentYear = new Date().getFullYear();

        // Replace placeholders in the template
        this.emailDto.content = template
          .replace('{{username}}', this.username)
          .replace('{{verificationLink}}', verificationLink)
          .replace('{{currentYear}}', currentYear.toString());

        // Send the email
        this.emailService.sendEmail(this.emailDto).subscribe(
          (res) => {
            this.response = res;
          },
          (err) => {
            console.error('Error sending email', err);
          }
        );
      },
      (err) => {
        console.error('Error loading email template', err);
      }
    );
  }
}
