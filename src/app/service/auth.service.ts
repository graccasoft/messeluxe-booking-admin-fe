import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as lo from 'localforage';
import { UserToken } from '../model/user-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private messeLuxeAuthLo = lo.createInstance({ name: 'messeLuxeAuthLo' });

  loggedIn = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<UserToken | null>(null)
  constructor() { }

  async initialize() {
    const user = await this.messeLuxeAuthLo.getItem<UserToken>('messe_luxe_user');
    this.notify(user);
  }

  async authenticate(user: UserToken | null) {
    await this.messeLuxeAuthLo.setItem('messe_luxe_user', user);
    this.notify(user);

  }

  private notify(user: UserToken | null) {
    this.loggedIn.next(!!user);
    this.user.next(user);
  }

  async logOut() {
    await this.authenticate(null);
  }

  isAuthenticated(): boolean {
    return !!this.user.value;
  }
}
