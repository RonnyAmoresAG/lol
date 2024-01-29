import { Component, OnInit } from '@angular/core';
import { Habitacion } from 'src/app/models/habitacion';
import { Global } from 'src/app/services/global';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css'],
  providers: [HotelService]
})
export class HabitacionesComponent implements OnInit {
  public Habitaciones: Habitacion[];
  public url: string;


  constructor(
    private _hotelService: HotelService
  ) {
    this.url = Global.url;
    this.Habitaciones = [];
  }

  ngOnInit(): void {
    this.obtenerHabitaciones()
  }

  obtenerHabitaciones() {
    this._hotelService.getHabitaciones().subscribe(
      response => {
        this.Habitaciones = response.habitaciones;
      },
      error => {
        console.error(error);
      }
    );
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses en JavaScript son 0-indexados
    const year = today.getFullYear();

    // Formato de fecha YYYY-MM-DD para el atributo 'min'
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate;
  }
  buscar() {
    // Lógica de búsqueda, realizar una acción
    console.log('Botón de buscar clicado');
  }

  anadir() {
    // Lógica de búsqueda, realizar una acción
    console.log('Botón de buscar clicado');
  }
}
