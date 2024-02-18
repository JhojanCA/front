import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Reserva } from 'src/app/interfaces/reserva';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent {  
  currentDate: Date = new Date();
  year: number = this.currentDate.getFullYear();
  month: string = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  day: string = this.currentDate.getDate().toString().padStart(2, '0');
  date: string = `${this.year}-${this.month}-${this.day}`;
  
  listReservas: { title: string, date: string }[] = [];
  listReservasFecha: Reserva[] = [];
  loading: boolean = false;

  calendarOptions: CalendarOptions = {
    locale: 'es',
    eventColor: '#000850',
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.dateClick.bind(this)
  };

  constructor(private _tourService: TourService, private renderer2: Renderer2) {}

  ngOnInit() {
    this.getReservas();
    this.getReservasFecha(this.date);
  }

  dateClick(arg: any) {
    this.date = arg.dateStr;
    this.getReservasFecha(arg.dateStr);
  }

  getReservas() {
    this.loading = true;
    this._tourService.getReservas().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.listReservas.push({ title: `${data[i].reservas}`, date: `${data[i].fecha}` });
      }
      this.calendarOptions.events = this.listReservas;
      this.loading = false;
    });
  }

  getReservasFecha(fecha: string) {
    this.loading = true;
    this._tourService.getReservasFecha(fecha).subscribe((data) => {
      this.listReservasFecha = data;
      this.loading = false;
    });
  }
}
