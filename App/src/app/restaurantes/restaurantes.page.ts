import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurantes',
  templateUrl: 'restaurantes.page.html',
  styleUrls: ['restaurantes.page.scss'],
  standalone:true,
  imports: [RouterModule, CommonModule,IonicModule],
})
export class RestaurantesPage {
  

  restaurantes=[
    {
      nombre:'La Brasa Roja',
      descripcion: 'Pollo asado o frito',
      calificacion: 4.5,
      imagen: 'assets/img/restaurante1.jpg'
    },
    {
      nombre:'Crepes and Wafles',
      descripcion: 'Comida de la mejor calidad con exelente sazon',
      calificacion: 4.9,
      imagen: 'assets/img/restaurante2.jpg'

    }
  ];
  agregarRestaurante() {
    // Por ahora solo muestra una alerta porque la funcionalidad no está implementada
    alert('Funcionalidad para agregar restaurante aún no implementada');
  }

}
