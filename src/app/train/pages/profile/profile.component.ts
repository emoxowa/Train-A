import { Component } from '@angular/core';
import { ProfileCardComponent } from '@app/train/components/profile-card/profile-card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
