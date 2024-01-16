import { Component, inject, TemplateRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
  private modal = inject(NgbModal);
  esTourMan: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.esTourMan = (event.url === '/tour_management');
      }
    });
  }

  openModal(content: TemplateRef<any>) {
		this.modal.open(content, { windowClass: 'dark-modal', size: 'lg' });
	}
}
