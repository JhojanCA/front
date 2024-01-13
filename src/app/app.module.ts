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
    TourReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
