import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { BookingComponent } from './components/user/booking/booking.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { DetailsComponent } from './components/user/details/details.component';
import { FooterComponent } from './components/user/footer/footer.component';
import { NavbarAdminComponent } from './components/admin/navbar-admin/navbar-admin.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { TourManagementComponent } from './components/admin/tour-management/tour-management.component';
import { BookingManagementComponent } from './components/admin/booking-management/booking-management.component';
import { TourReservationComponent } from './components/user/tour-reservation/tour-reservation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component'
import { AddTokenInterceptor } from './utils/add-token.interceptor';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { StatisticsComponent } from './components/admin/statistics/statistics.component';

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
    LoginRegisterComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
