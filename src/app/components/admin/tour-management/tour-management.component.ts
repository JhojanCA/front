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
  images: File[] = [];
  urls: (string | ArrayBuffer)[] = [];
  loading: boolean = false;

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
      this.images = event.target.files;
      for (let i = 0; i < this.images.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.urls.push(reader.result!);
        };
        reader.readAsDataURL(this.images[i]);
      }
    }
  }

  getListTours() {
    this.loading = true;
    this._tourService.getListTours().subscribe((data: Tour[]) => {
      this.listTours = data;
      this.loading = false;
    })
  }

  getTour(id: number) {
    this._tourService.getTour(id).subscribe((data: Tour[]) => {
      this.formMod.setValue({
        id_categoria: data[0].id_categoria,
        nombre: data[0].nombre,
        descripcion: data[0].descripcion,
        precio: data[0].precio,
      });
    })    
  }

  getImagenes(id: number) {
    this._tourService.getImagenes(id).subscribe((data: Tour[]) => {
      this.images
    })
  }

  getCategorias() {
    this._tourService.getCategorias().subscribe((data: Tour[]) => {
      this.listCategorias = data;
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

  openModal(content: TemplateRef<any>, id: number) {
    this.modal.open(content, { windowClass: 'dark-modal', size: 'lg' });
    this.getCategorias();
    this.getTour(id);
  }

}
