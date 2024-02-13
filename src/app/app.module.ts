import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { BookingComponent } from './components/user/booking/booking.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { DetailsComponent } from './components/user/details/details.component';
import { FooterComponent } from './components/user/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarAdminComponent } from './components/admin/navbar-admin/navbar-admin.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { TourManagementComponent } from './components/admin/tour-management/tour-management.component';
import { BookingManagementComponent } from './components/admin/booking-management/booking-management.component';
import { TourReservationComponent } from './components/user/tour-reservation/tour-reservation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component'
import { AddTokenInterceptor } from './utils/add-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    BookingComponent,
    NavbarComponent,
    DetailsComponent,
    FooterComponent,
    NavbarAdminComponent,
    MainAdminComponent,
    TourManagementComponent,
    BookingManagementComponent,
    TourReservationComponent,
    ProgressBarComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
