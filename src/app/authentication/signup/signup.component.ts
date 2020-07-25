import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
    constructor(private authService : AuthService) { }
  //data: UserModel;
  data: {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string
  }
  ngOnInit(): void {  
    this.signUpForm = new FormGroup(
      {
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required]),
          'firstname': new FormControl(null, [Validators.required]),
          'lastname': new FormControl(null, [Validators.required]),
          'email': new FormControl(null,[Validators.required, Validators.email]),
          'phone': new FormControl(null, [Validators.required]),
          'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
        })
      }
    );
  }

  onSignUp() {
    this.data = {
      username : this.signUpForm.get('userData.username').value,
      firstname : this.signUpForm.get('userData.firstname').value,
      lastname : this.signUpForm.get('userData.lastname').value,
      email : this.signUpForm.get('userData.email').value,
      phone : this.signUpForm.get('userData.phone').value,
      password : this.signUpForm.get('userData.password').value,
    }
    console.log(this.data);
    this.authService.signUp( this.data);
  }

}
