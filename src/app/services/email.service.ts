import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EmailDTO {
  recipient: string;
  subject: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = `${environment.baseURL}notification/email`;

  constructor(private http: HttpClient) { }

  sendEmail(emailDto: EmailDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, emailDto, { headers });
  }
}
