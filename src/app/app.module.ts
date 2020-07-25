import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from './authentication/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home.component'
import { AuthGuard } from './authentication/authGuard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService,
    CookieService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
