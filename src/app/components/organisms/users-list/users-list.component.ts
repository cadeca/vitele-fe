import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../providers/types/wl-types';
import {Router} from '@angular/router';

@Component({
  selector: 'wl-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  visibleUsers: User[] = [];
  private allUsers: User[] = [];
  @Input()
  isEditable = false;
  @Output()
  removeUser: EventEmitter<string> = new EventEmitter<string>();


  @Input()
  set users(users: User[]) {
    if (users) {
      this.visibleUsers = [...users];
      this.allUsers = [...users];
    }
  }

  @Input()
  set searchField(searchField: string) {
    if (searchField) {
      this.visibleUsers = this.allUsers.filter(user => {
        return user.firstName.toLowerCase().includes(searchField.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchField.toLowerCase()) ||
          user.username.toLowerCase().includes(searchField.toLowerCase()) ||
          user.email.toLowerCase().includes(searchField.toLowerCase());
      });
    } else {
      this.visibleUsers = this.allUsers;
    }
  }

  constructor(private router: Router) { }

  editUser(username): void {
    this.removeUser.emit(username);
  }
}
