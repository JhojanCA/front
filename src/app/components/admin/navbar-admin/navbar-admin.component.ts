import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
  private modal = inject(NgbModal);

  openModal(content: TemplateRef<any>) {
		this.modal.open(content, { windowClass: 'dark-modal', size: 'lg' });
	}
}
