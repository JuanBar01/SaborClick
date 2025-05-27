import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [GoogleMapsModule, IonicModule],
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage {
  // Centro inicial del mapa (puedes cambiar a la ubicación que quieras)
  center: google.maps.LatLngLiteral = { lat: 4.7110, lng: -74.0721 }; 
  zoom = 12;

}
