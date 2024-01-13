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
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'tour_reservation',
    component: TourReservationComponent
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
