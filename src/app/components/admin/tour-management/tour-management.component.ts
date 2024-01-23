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
  form: FormGroup;
  listTours: Tour[] = [];
  loading: boolean = false;

  constructor(private _tourService: TourService,
              private fb: FormBuilder) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [null, Validators.required],
      id_categoria: [null, Validators.required],
      image: [null, Validators.required],
      descripcion: ['', Validators.required],
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
  
  openModal(content: TemplateRef<any>, id: number) {
    this.modal.open(content, { windowClass: 'dark-modal', size: 'lg' });
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
