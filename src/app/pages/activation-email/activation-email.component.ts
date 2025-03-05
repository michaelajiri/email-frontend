import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activation-email',
  templateUrl: './activation-email.component.html',
  styleUrls: ['./activation-email.component.css']
})
export class ActivationEmailComponent {
  receiverEmail: string = '';
  subject: string = 'Account Activation';
  htmlContent: string = '<p>Please click the link below to activate your account:</p><a href="{{ACTIVATION_LINK}}">Activate Now</a>';

  constructor(private authService: AuthService) {}

  sendEmail() {
    if (this.receiverEmail && this.subject && this.htmlContent) {
      this.authService.sendActivationEmail(this.receiverEmail, this.subject, this.htmlContent)
        .subscribe(
          response => {
            alert('Activation email sent successfully!');
          },
          error => {
            alert('Failed to send activation email.');
          }
        );
    } else {
      alert('All fields are required!');
    }
  }
}
