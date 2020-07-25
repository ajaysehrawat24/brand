import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
isLogged : boolean;
    constructor(
        private authService : AuthService,
        private route : Router
    ){}

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot){
       this.isLogged = this.authService.isAuthenticated();
       console.log(this.isLogged);
        if(!this.isLogged){
            this.route.navigate(['login']);
        }
        return this.authService.isAuthenticated();
    } 
}