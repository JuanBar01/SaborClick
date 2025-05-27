import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage {
  selectedDateTime: string = '';
  today: string = new Date().toISOString();

  nextReservation: any = null;  // Ejemplo: { restaurant: 'La Pampa', date: new Date() }
  canRate = false;
  rating: number = 3;

  onDateChange(event: any) {
    console.log('Fecha y hora seleccionadas:', this.selectedDateTime);
  }

  confirmReservation() {
    if (!this.selectedDateTime) {
      alert('Selecciona una fecha y hora');
      return;
    }

    this.nextReservation = {
      restaurant: 'Crepes',
      date: new Date(this.selectedDateTime)
    };

    this.canRate = false; // se activa después de la fecha real si implementas lógica
    alert('Reserva confirmada');
  }

  submitRating() {
    alert(`Calificación enviada: ${this.rating} estrellas`);
    this.canRate = false;
  }
}
