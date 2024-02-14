import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/interfaces/reserva';
import { Tour } from 'src/app/interfaces/tour';
import { User } from 'src/app/interfaces/user';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tour-reservation',
  templateUrl: './tour-reservation.component.html',
  styleUrls: ['./tour-reservation.component.css']
})
export class TourReservationComponent {
  id_usuario: number;
  id_tour: number;
  tour: string = '';
  precio: number = 0;
  num_per: number = 1;
  total: number = 0;
  usuario: User;
  form: FormGroup;
  loading: boolean = false;

  constructor(private _tourService: TourService,
              private _userService: UserService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      id_usuario: [''],
      id_tour: [''],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      num_personas: [this.num_per, Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });

    this.usuario = {
      id_rol: 0,
      nombre: '',
      apellido: '',
      telefono: 0,
      correo: '',
      usuario: '',
      password: ''
    };

    this.id_usuario = Number(localStorage.getItem('id'));
    this.id_tour = Number(aRoute.snapshot.paramMap.get('id_tour'));
  }


  ngOnInit(): void {
    this.getTour(this.id_tour);
    this.getUser(this.id_usuario);
  }


  addReserva(){
    const reserva: Reserva = {
      id_usuario: this.id_usuario, 
      id_tour: this.id_tour,
      nombre: this.form.value.nombre,
      correo: this.form.value.correo,
      telefono: this.form.value.telefono,
      num_personas: this.form.value.num_personas,
      total: this.total,
      fecha: this.form.value.fecha,
      hora: this.form.value.hora
    }

    this.loading = true;
    this._tourService.saveReserva(reserva).subscribe(() => {
      this.loading = false;
      Swal.fire({
        title: "RESERVA REALIZADA!",
        icon: "success"
      }); 
    });
  }


  getTour(id_tour: number) {
    this.loading = true;
    this._tourService.getTour(id_tour).subscribe((data: Tour[]) => {
      this.tour = data[0].nombre;
      this.precio = data[0].precio;
      this.loading = false;
      this.calcular();
    });
  }


  getUser(id_usuario: number){
    this.loading = true;
    this._userService.getUser(id_usuario).subscribe((data: User) => {
      this.usuario.nombre = data.nombre,
      this.usuario.correo = data.correo,
      this.usuario.telefono = data.telefono
    })
  }

  calcular() {
    this.total = this.precio * this.num_per;
  }
}
