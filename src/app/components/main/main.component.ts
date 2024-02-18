import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private ngbCarousel: NgbCarouselModule, private _userService: UserService, private router: Router) {}

  ngOnInit() {
    const id = Number(localStorage.getItem('id'));
    this._userService.getUser(id).subscribe((data) => {
      if (data.id_rol === 1) {
        this.router.navigate(['/main']);
      }
    })
  }
}
