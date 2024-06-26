import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/user/booking/booking.component';
import { DetailsComponent } from './components/user/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { MainAdminComponent } from './components/admin/main-admin/main-admin.component';
import { BookingManagementComponent } from './components/admin/booking-management/booking-management.component';
import { TourManagementComponent } from './components/admin/tour-management/tour-management.component';
import { TourReservationComponent } from './components/user/tour-reservation/tour-reservation.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthGuard } from './utils/auth.guard';
import { StatisticsComponent } from './components/admin/statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: LoginRegisterComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'tour_reservation/:id_tour',
    component: TourReservationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'main',
    component: MainAdminComponent
  },
  {
    path: 'booking_management',
    component: BookingManagementComponent
  },
  {
    path: 'tour_management',
    component: TourManagementComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
