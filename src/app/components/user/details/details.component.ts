import { Component } from '@angular/core';
import { NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Tour } from 'src/app/interfaces/tour';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  loading: boolean = false;
  id: number;
  tour: Tour[] = [];
  images: Tour[] = [];
  listTours: Tour[] = [];

  constructor(private ngbCarousel: NgbCarouselModule,
              private ngbRating: NgbRatingModule,
              private _tourService: TourService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id !== 0) {
        this.getTour(this.id);
      }
    });

    this.getListTours();
  }

  getTour(id: number) {
    this.loading = true;
    this._tourService.getTour(id).subscribe((data: Tour[]) => {
      this.tour = data;
      this.getImagenes(id);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    })
  }
  
  getImagenes(id: number) {
    this._tourService.getImagenes(id).subscribe((data: Tour[]) => {
      this.images = data;
    })
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

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
