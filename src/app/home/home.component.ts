import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { SessionMOdel } from '../authentication/session.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  showUserInfo = false;
  isUserAuthenticated = true;
  userDetails: SessionMOdel;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logOut();
  }

  onGetUser() {
    console.log('in ongetusers');
    this.authService.getUserDetails()
      .subscribe(response => {
        if(response != null){
          console.log("userdetails response" + response.firstname);
        this.userDetails = response;
        this.showUserInfo = !this.showUserInfo;
        }
        else{
          console.log("unauth")
          this.authService.logOut();
        }
      });
  }

}
