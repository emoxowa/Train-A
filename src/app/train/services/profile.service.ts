import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserInformation, IUserResponse } from '@app/train/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);

  public getUserInformation(): Observable<IUserResponse> {
    return this.http.get<IUserResponse>('/api/profile');
  }

  public updateUserInformation(updates: Partial<IUserInformation>): Observable<IUser> {
    return this.http.put<IUser>('/api/profile', updates);
  }

  public updatePassword(password: string) {
    return this.http.put('/api/profile/password', { password });
  }
}
