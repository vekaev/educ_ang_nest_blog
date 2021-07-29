import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login-form-ui',
  templateUrl: './admin-login-form-ui.component.html',
  styleUrls: ['./admin-login-form-ui.component.scss'],
})
export class AdminLoginFormUiComponent implements OnInit {
  @Input() formError = '';

  constructor() {}

  ngOnInit(): void {
    const formData = {
      accountInformation: {

      }
    }
  }
}
