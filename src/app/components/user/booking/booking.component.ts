import { Component } from '@angular/core';
import { Tour } from 'src/app/interfaces/tour';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  listTours: Tour[] = [];
  loading: boolean = false;

  constructor(private _tourService: TourService) {}

  ngOnInit(): void {
    this.getListTours();
  }

  getListTours() {
    this.loading = true;
    this._tourService.getListTours().subscribe((data: Tour[]) => {
      this.listTours = data;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    })
  }
}
