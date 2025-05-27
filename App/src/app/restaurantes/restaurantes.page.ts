import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService, Restaurante } from '../services/restaurantes.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: 'restaurantes.page.html',
  styleUrls: ['restaurantes.page.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule,RouterModule,HttpClientModule,FormsModule],
})

export class RestaurantesPage implements OnInit {

  restaurantes: Restaurante[] = [];
  mostrarFormulario = false;

  // Campos formulario
  nombre = '';
  direccion='';
  descripcion = '';
  calificacion: number | null = null;
  archivoLogo: File | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarRestaurantes();
  }

  cargarRestaurantes() {
    this.apiService.getRestaurantes().subscribe(rests => {
      this.restaurantes = rests;
    });
  }

  agregarRestaurante() {
    this.mostrarFormulario = true;
  }

  seleccionarArchivo(event: any) {
    this.archivoLogo = event.target.files[0];
  }

  enviarFormulario() {
    if (!this.nombre || !this.descripcion || this.calificacion === null || !this.archivoLogo) {
      alert('Por favor llena todos los campos y selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('direccion', this.direccion);
    formData.append('descripcion', this.descripcion);
    formData.append('calificacion', this.calificacion.toString());
    formData.append('direccion', 'Dirección genérica'); // Si quieres pedir dirección en formulario agrega campo y append aquí
    formData.append('logo', this.archivoLogo);

    this.apiService.agregarRestaurante(formData).subscribe(res => {
      alert('Restaurante agregado con éxito');
      this.mostrarFormulario = false;
      this.limpiarFormulario();
      this.cargarRestaurantes();
    }, error => {
      alert('Error al agregar restaurante');
    });
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.calificacion = null;
    this.archivoLogo = null;
  }

  cancelar() {
    this.mostrarFormulario = false;
  }
}

