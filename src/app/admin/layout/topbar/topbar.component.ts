import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-topbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  /* @Input() pageTitle = 'Dashboard';
  @Input() pageBreadcrumb = ''; */

  pageTitle = 'Dashboard';
  pageBreadcrumb = '';

  searchQuery = '';
  hasNotifications = true;

  user = {
    name: 'Developer',
    role: 'SuperAdmin',
    avatar: null as string | null,
  };

  get initials(): string {
    return this.user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

}
