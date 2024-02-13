import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tour } from 'src/app/interfaces/tour';
import { TourService } from 'src/app/services/tour.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
  private modal = inject(NgbModal);
  esTourMan: boolean = false;
  loading: boolean = false;
  id: number = 0;
  form: FormGroup;
  images: File[] = [];
  listCategorias: Tour[] = [];
  urls: (string | ArrayBuffer)[] = [];
  

  constructor(private router: Router,
              private fb: FormBuilder,
              private _tourService: TourService) {

    this.form = this.fb.group({
      id_categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      image: ['', Validators.required],
    });
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.esTourMan = (event.url === '/tour_management');
      }
    });
  }


  ngOnInit(): void {}


  onPhotoSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.images = event.target.files;
      for (let i = 0; i < this.images.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.urls.push(reader.result!);
        };
        reader.readAsDataURL(this.images[i]);
      }
      this.urls = [];

    } else {
      this.urls = [];
    }
  }


  addTour() {
    const tour: Tour = {
      id: this.id,
      id_categoria: this.form.value.id_categoria,
      categoria: '',
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio,
      calificacion: 0,
      image: '',
    }

    this._tourService.saveTour(tour).subscribe(() => {
      this.addImage(tour.id!);  
      this.closeModal();
      this.form.setValue({
        id_categoria: '',
        nombre: '',
        descripcion: '',
        precio: '',
        image: '',
      });
    });
  }

  
  addImage(id_tour: number) {
    this._tourService.saveImagen(id_tour, this.images).subscribe(() => {
      this._tourService.tourAdded.emit();  
      Swal.fire({
        title: "GUARDADO CON ÉXITO!",
        icon: "success"
      }); 
    });
  }


  getCategorias() {
    this._tourService.getCategorias().subscribe((data: Tour[]) => {
      this.listCategorias = data;
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  openModal(content: TemplateRef<any>) {
		this.modal.open(content, { windowClass: 'dark-modal', size: 'lg' });
    this.id = parseInt(uuidv4().replace(/\D/g, '').toString().slice(0, 10));
    this.getCategorias();
	}

  closeModal() {
    this.modal.dismissAll();
  }
}
