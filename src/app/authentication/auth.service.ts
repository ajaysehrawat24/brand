import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SessionMOdel } from './session.model';
@Injectable()
export class AuthService implements OnInit {
    session: { id: string };
    sessionId: string;
    head: HttpHeaders;
    head2: HttpHeaders;
    failedLogin = false;
    sess: {
        sessionId: string, username: string, firstname: string, lastname: string, phone: string, email: string,
        dob : string
    };
    user : SessionMOdel;
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router) { }

    ngOnInit() {

    }

    signUp(data: any) {
        this.http.post('http://localhost:8085/register', data)
            .subscribe(resp => {
                console.log("the response" + resp);
            });
        this.router.navigate(['login']);
    }

    login(data: any) {
        this.http.post<string>("http://localhost:8085/login", data)
            .subscribe(resp => {
                if (resp != 'fail') {
                    console.log("setting the cookie  " + resp);
                    this.cookieService.set('sessionId', resp);
                    this.router.navigate([""]);
                }
                else {
                    this.failedLogin = true;
                }
            });
    }

    logOut() {
        this.sessionId = this.cookieService.get("sessionId");
        this.head = new HttpHeaders({
            "token": this.sessionId,
            'Content-Type': 'application/json',
        });
        this.http.delete("http://localhost:8085/deleteSession", {
            headers: this.head
        })
            .subscribe(resp => {

                console.log(resp);
                
                    this.cookieService.deleteAll();
                    this.router.navigate(['login']);
            });
    }

    isAuthenticated() {
        return this.cookieService.check('sessionId');
    }

    getUserDetails() {
        this.sessionId = this.cookieService.get("sessionId");
        console.log(this.sessionId)

        console.log('in service');
        this.head2 = new HttpHeaders({
            "token": this.sessionId,
            'Content-Type': 'application/json',
        });
       return  this.http.get<SessionMOdel>("http://localhost:8085/getUserDetails", { headers: this.head2 });
           
    }
}