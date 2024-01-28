import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  buscar() {
    // Lógica de búsqueda, realizar una acción
    console.log('Botón de buscar clicado');
  }
}
