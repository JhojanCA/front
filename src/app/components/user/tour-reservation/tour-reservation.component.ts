import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from 'src/app/interfaces/reserva';
import { Tour } from 'src/app/interfaces/tour';
import { TourService } from 'src/app/services/tour.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tour-reservation',
  templateUrl: './tour-reservation.component.html',
  styleUrls: ['./tour-reservation.component.css']
})
export class TourReservationComponent {
  id_tour: number;
  tour: string = '';
  form: FormGroup;
  loading: boolean = false;

  constructor(private _tourService: TourService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      id_usuario: [''],
      id_tour: [''],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      num_personas: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });

    this.id_tour = Number(aRoute.snapshot.paramMap.get('id_tour'));
  }

  ngOnInit(): void {
    this.getTour(this.id_tour);
  }


  addReserva(){
    const reserva: Reserva = {
      id_usuario: 4, //se debe cambiar este valor por la variable del usuario
      id_tour: this.id_tour,
      nombre: this.form.value.nombre,
      correo: this.form.value.correo,
      telefono: this.form.value.telefono,
      num_personas: this.form.value.num_personas,
      fecha: this.form.value.fecha,
      hora: this.form.value.hora
    }

    // console.log(reserva);
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
      setTimeout(() => { this.loading = false }, 1000);
    });
  }

}
