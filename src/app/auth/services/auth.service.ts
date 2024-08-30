import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SignInResponse } from '../models/sign-in.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly signInUrl = '/api/signin';


  private readonly signUpUrl = '/api/signup';

  private readonly logoutUrl = '/api/logout';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signIn(email: string, password: string): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(this.signInUrl, { email, password })
      .pipe(tap((response) => this.setToken(response.token)));
  }

  signUp(email: string, password: string) {
    return this.http.post(this.signUpUrl, { email, password });
  }

  logout() {
    return this.http.delete(this.logoutUrl).pipe(
      tap(() => {
        this.clearToken();
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token')!;
  }

  public clearToken(): void {
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
