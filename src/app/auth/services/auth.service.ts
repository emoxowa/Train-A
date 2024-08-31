import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserActions } from '@core/store/user-store/actions/user.actions';
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
    private store: Store
  ) {}

  signIn(email: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(this.signInUrl, { email, password }).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.store.dispatch(UserActions.loadUser());
      })
    );
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
}
