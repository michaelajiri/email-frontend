import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../config/ApiConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private umgtBaseUrl = ApiConfig.UMGT_BASE_URL;
  private smpBaseUrl = ApiConfig.SMP_BASE_URL;

  constructor(private http: HttpClient) {}

  sendActivationEmail(receiverEmail: string, subject: string, htmlContent: string): Observable<any> {
    const payload = {
      receiverEmail: receiverEmail,
      subject: subject,
      htmlContent: htmlContent
    };
    
    return this.http.post<any>(`${this.umgtBaseUrl}user/email-activation`, payload);
  }

  activateUser(token: string): Observable<any> {
    const url = `${this.umgtBaseUrl}user/activate?token=${token}`;
    console.log("Calling activation API:", url);  // Debugging
    return this.http.post(url, {}, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }  

  sendPaymentInvoice(receiverEmail: string, subject: string, htmlContent: string): Observable<any> {
    const payload = {
      receiverEmail: receiverEmail,
      subject: subject,
      htmlContent: htmlContent
    };
    
    return this.http.post<any>(`${this.smpBaseUrl}payment/send-invoice`, payload);
  }
}