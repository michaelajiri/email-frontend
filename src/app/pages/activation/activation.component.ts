import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  activationStatus: string = "Click the button to activate your account.";
  token: string | null = null;
  isActivated: boolean = false; // Prevent multiple activations

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.activationStatus = "No activation token found.";
    }
  }

  activateUser(): void {
    if (!this.token || this.isActivated) return;

    this.activationStatus = "Activating...";
    console.log("Activating with token:", this.token);

    this.authService.activateUser(this.token).subscribe(
      response => {
        console.log("Activation success:", response);
        this.activationStatus = "Account activated successfully!";
        this.isActivated = true; // Prevent further clicks
      },
      error => {
        console.log("Activation error:", error);
        this.activationStatus = "Activation failed. Please try again.";
      }
    );
  }
}