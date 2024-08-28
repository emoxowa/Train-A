import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IUser, IUserInformation, IUserResponse } from '@app/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);

  public getUserInformation(): Observable<IUserResponse> {
    return this.http.get<IUserResponse>('/api/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  public updateUserInformation(updates: Partial<IUserInformation>): Observable<IUser> {
    return this.http.put<IUser>('/api/profile', updates, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  public updatePassword(password: string) {
    return this.http.put(
      '/api/profile/password',
      { password },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  }

  public logout(): Observable<object> {
    return this.http
      .delete<object>('/api/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
        })
      );
  }
}
