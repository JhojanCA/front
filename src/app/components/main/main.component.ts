import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  images: any[] = [
    { 
      text: 'Ven y disfruta de nuestros recorridos turísticos',
      img: 'assets/slider1.jpg' 
    },
    { 
      text: 'Aparta tu cupo para un tour que jamás olvidarás',
      img: 'assets/slider2.jpg' 
    },
  ];

  constructor(private ngbCarousel: NgbCarouselModule) {}
}
