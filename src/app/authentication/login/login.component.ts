import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  data: { username: string, password: string }
  constructor(private authService: AuthService,
    private router : Router) { }
  failedLogin : boolean;
  
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['']);
    }
    this.loginForm = new FormGroup({
      "userData": new FormGroup({
        "username": new FormControl(null, Validators.required),
        "password": new FormControl(null, Validators.required),
      }

      ),
    });
  }

  onLogin() {
    this.data = {
      username: this.loginForm.get("userData.username").value,
      password: this.loginForm.get("userData.password").value
    }
    this.authService.login(this.data);
    setTimeout(() => {
      this.failedLogin = this.authService.failedLogin;
      console.log(this.failedLogin)
    }, 200);

  }


}
