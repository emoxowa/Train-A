import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, IUserInformation, IUserResponse } from '@app/train/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);

  private readonly profileUrl = '/api/profile';

  private readonly passwordUrl = `${this.profileUrl}/password`;

  public getUserInformation(): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(this.profileUrl);
  }

  public updateUserInformation(updates: Partial<IUserInformation>): Observable<IUser> {
    return this.http.put<IUser>(this.profileUrl, updates);
  }

  public updatePassword(password: string) {
    return this.http.put(this.passwordUrl, { password });
  }
}
