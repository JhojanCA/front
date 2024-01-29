import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tour } from 'src/app/interfaces/tour';
import { TourService } from 'src/app/services/tour.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-management.component.html',
  styleUrls: ['./tour-management.component.css']
})
export class TourManagementComponent {
  private modal = inject(NgbModal);
  formMod: FormGroup;
  listTours: Tour[] = [];
  listCategorias: Tour[] = [];
  images: Tour[] = [];
  file: File[] = [];
  urls: (string | ArrayBuffer)[] = [];
  loading: boolean = false;
  id_tour: number = 0; 

  constructor(private _tourService: TourService,
              private fb: FormBuilder) {

    this.formMod = this.fb.group({
      id_categoria: [''],
      nombre: [''],
      descripcion: [''],
      precio: ['']
    });
  }


  ngOnInit(): void {
    this.getListTours();

    this._tourService.tourAdded.subscribe(() => {
      this.getListTours();
    });
  }


  onPhotoSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files;
      for (let i = 0; i < this.file.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.urls.push(reader.result!);
        };
        reader.readAsDataURL(this.file[i]);
      }
      this.urls = [];
    }
    else {
      this.urls = [];
    }
  }

  updatePhotoSelected(event: any, id: number) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files;
      this._tourService.putImagen(id, this.file).subscribe(() => {
        Swal.fire({
          title: "ACTUALIZADO CON ÉXITO!",
          icon: "success"
        });
        this.getImagenes(this.id_tour);
      });
    }
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


  getTour(id: number) {
    this.loading = true;
    this._tourService.getTour(id).subscribe((data: Tour[]) => {
      this.formMod.setValue({
        id_categoria: data[0].id_categoria,
        nombre: data[0].nombre,
        descripcion: data[0].descripcion,
        precio: data[0].precio,
      });
      this.getImagenes(id);
      this.id_tour = id;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    })    
  }


  deleteTour(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El registro será eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b60000",
      cancelButtonColor: "#000850",
      confirmButtonText: "SI, ESTOY SEGURO",
      cancelButtonText: "NO"
    }).then((result) => {
      if (result.isConfirmed) {

        this.loading = true;
        this._tourService.deleteTour(id).subscribe(() => {
          this.getListTours();
          this.loading = false;
        });

        Swal.fire({
          title: "Eliminado",
          text: "El registro fue eliminado con éxito",
          icon: "success",
          confirmButtonColor: "#000850",
        });
      }
    });    
  }


  putTour(){
    const tour: Tour = {
      id_categoria: this.formMod.value.id_categoria,
      categoria: '',
      nombre: this.formMod.value.nombre,
      descripcion: this.formMod.value.descripcion,
      precio: this.formMod.value.precio,
      calificacion: 0,
      image: ''
    }

    this.loading = true;
    this._tourService.putTour(this.id_tour, tour).subscribe(() => {
      Swal.fire({
          title: "ACTUALIZADO CON ÉXITO!",
          icon: "success"
        }); 
      this.loading = false;
      this.getListTours();
      this.closeModal();
    })
  }


  getImagenes(id_tour: number) {
    this._tourService.getImagenes(id_tour).subscribe((data: Tour[]) => {
      this.images = data;
    });
  }


  addImages() {
    this.loading = true
    this._tourService.saveImagen(this.id_tour, this.file).subscribe(() => {
      
      Swal.fire({
        title: "GUARDADO CON ÉXITO!",
        icon: "success"
      }); 
      
      this.urls = [];
      this.loading = false;
    });
  }


  deleteImagen(id: number, id_tour: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La imagen será eliminada!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b60000",
      cancelButtonColor: "#000850",
      confirmButtonText: "SI, ESTOY SEGURO",
      cancelButtonText: "NO"
    }).then((result) => {
      if (result.isConfirmed) {

        this.loading = true;
        this._tourService.deleteImagen(id).subscribe(() => {
          this.getImagenes(id_tour);
          this.loading = false;
        });

        Swal.fire({
          title: "Eliminada",
          text: "La imagen fue eliminada con éxito",
          icon: "success",
          confirmButtonColor: "#000850",
        });
      }
    });    
  }


  getCategorias() {
    this._tourService.getCategorias().subscribe((data: Tour[]) => {
      this.listCategorias = data;
    })
  }


  openModal(content: TemplateRef<any>, size: string, id: number) {
    this.modal.open(content, { windowClass: 'dark-modal', size });
    this.getCategorias();
    this.getTour(id);
  }
  

  closeModal() {
    this.modal.dismissAll();
  }
}
