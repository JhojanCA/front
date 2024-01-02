import { Component } from '@angular/core';
import { NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  rate = 4.8;
  images: any[] = [
    { img: 'assets/slider3.jpg' },
    { img: 'assets/slider2.jpg' },
    { img: 'assets/slider1.jpg' },
  ];

  constructor(private ngbCarousel: NgbCarouselModule,
              private ngbRating: NgbRatingModule) {}
}
