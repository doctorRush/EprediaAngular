import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private msalService: MsalService
  ) {

  }

  ngOnInit() {
  }
  Login() {
    this.msalService.loginRedirect();
    // this.msalService.o
  }
}
