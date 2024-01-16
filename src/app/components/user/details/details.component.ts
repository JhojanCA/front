import { Component } from '@angular/core';
import { NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/interfaces/tour';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  rate = 4.8;
  loading: boolean = false;
  id: number;
  tour: Tour[] = [];
  images: any[] = [
    { img: 'assets/slider3.jpg' },
    { img: 'assets/slider2.jpg' },
    { img: 'assets/slider1.jpg' },
  ];

  constructor(private ngbCarousel: NgbCarouselModule,
              private ngbRating: NgbRatingModule,
              private _tourService: TourService,
              private fb: FormBuilder, 
              private router: Router,
              private aRoute: ActivatedRoute) {
    
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.getTour(this.id);
    }
  }

  getTour(id: number) {
    this.loading = true;
    this._tourService.getTour(id).subscribe((data: Tour[]) => {
      this.loading = false;
      this.tour = data;
    })
  }
}
