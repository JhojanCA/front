import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tour } from 'src/app/interfaces/tour';
import { TourService } from 'src/app/services/tour.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
  private modal = inject(NgbModal);
  esTourMan: boolean = false;
  form: FormGroup;
  listCategorias: Tour[] = [];
  

  constructor(private router: Router,
              private fb: FormBuilder,
              private _tourService: TourService) {

    this.form = this.fb.group({
      id_categoria: [''],
      nombre: [''],
      descripcion: [''],
      precio: [null],
      image: [null],
    });
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.esTourMan = (event.url === '/tour_management');
      }
    });
  }


  ngOnInit(): void {
    
  }


  addTour() {
    const tour: Tour = {
      id_categoria: this.form.value.id_categoria,
      categoria: '',
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio,
      calificacion: 0,
      image: '',
    }

    this._tourService.saveTour(tour).subscribe(() => {
      Swal.fire({
        title: "ACTUALIZADO CON ÉXITO!",
        icon: "success"
      }); 
      this.closeModal();
    });
  }
  

  getCategorias() {
    this._tourService.getCategorias().subscribe((data: Tour[]) => {
      this.listCategorias = data;
    });
  }


  openModal(content: TemplateRef<any>) {
		this.modal.open(content, { windowClass: 'dark-modal', size: 'lg' });
    this.getCategorias();
	}

  closeModal() {
    this.modal.dismissAll();
  }
}
