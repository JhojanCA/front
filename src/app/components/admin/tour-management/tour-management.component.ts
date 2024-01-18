import { Component, inject, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tour } from 'src/app/interfaces/tour';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-management.component.html',
  styleUrls: ['./tour-management.component.css']
})
export class TourManagementComponent {
  private modal = inject(NgbModal);
  listTours: Tour[] = [];
  
  openModal(content: TemplateRef<any>) {
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
