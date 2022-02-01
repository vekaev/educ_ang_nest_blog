import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from '../../../../store/admin-auth-store/store/admin-auth.actions';
import * as adminAuth from '../../../../store/admin-auth-store/store/admin-auth.selectors';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login-block',
  templateUrl: './admin-login-block.component.html',
  styleUrls: ['./admin-login-block.component.scss'],
})
export class AdminLoginBlockComponent implements OnInit {
  loading$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoaded));
  serverError$: Observable<string> = this.store$.pipe(select(adminAuth.getServerError));

  constructor(private store$: Store, private httpClient: HttpClient) {}

  ngOnInit(): void {}

  onLogin(loginPayload: { login: string; password: string }) {
    this.store$.dispatch(login(loginPayload));
  }

  testProfile() {
    this.httpClient.get('http://localhost:3000/auth/profile').subscribe(console.log);
  }
}
