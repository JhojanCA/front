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
  loading: boolean = false;

  constructor(private _tourService: TourService,
              private fb: FormBuilder) {

    this.formMod = this.fb.group({
      id_categoria: [''],
      nombre: [''],
      descripcion: [''],
      precio: [null],
      // image: [''],
    });
  }

  ngOnInit(): void {
    this.getListTours();
  }

  getListTours() {
    this.loading = true;
    this._tourService.getListTours().subscribe((data: Tour[]) => {
      this.listTours = data;
      this.loading = false;
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
      // console.log(data[0]);
      this.loading = false;
    })    
  }

  getCategorias() {
    this._tourService.getCategorias().subscribe((data: Tour[]) => {
      this.listCategorias = data;
    })
  }
  
  openModal(content: TemplateRef<any>, id: number) {
    this.modal.open(content, { windowClass: 'dark-modal', size: 'lg' });
    this.getCategorias();
    this.getTour(id);
    // console.log(id);
  }

  delete() {
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
        Swal.fire({
          title: "Eliminado",
          text: "El registro fue eliminado con éxito",
          icon: "success",
          confirmButtonColor: "#000850",
        });
      } else {
        
      }
    });    
  }

}
