import { Component } from '@angular/core';
import { Tour } from 'src/app/interfaces/tour';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  listToursRiver: Tour[] = [];
  listToursCity: Tour[] = [];
  loading: boolean = false;

  constructor(private _tourService: TourService) {}

  ngOnInit(): void {
    this.getListTours();
  }

  getListTours() {
    this.loading = true;
    this._tourService.getListTours().subscribe((data: Tour[]) => {
      this.listToursRiver = data.filter(tour => tour.categoria === 'Río Sinú');
      this.listToursCity = data.filter(tour => tour.categoria === 'Ciudad');
      console.log(this.listToursCity);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    })
  }
}
