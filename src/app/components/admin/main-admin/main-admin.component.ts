import { Component } from '@angular/core';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent {
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
