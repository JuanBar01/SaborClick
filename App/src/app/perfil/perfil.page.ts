import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {

  isRegistering = false;

  usuario = '';
  contrasena = '';
  confirmarcontrasena = '';

  constructor() { }

  ngOnInit() {
  }

  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.usuario= '';
    this.contrasena = '';
    this.confirmarcontrasena = '';
  }

  onSubmit() {
    if (this.isRegistering) {
      if (this.contrasena !== this.confirmarcontrasena) {
        alert('Las contraseñas no coinciden');
        return;
      }
      alert(`Creando cuenta para ${this.usuario}`);
      // Aquí iría la llamada al servicio de registro
    } else {
      alert(`Iniciando sesión para ${this.usuario}`);
      // Aquí iría la llamada al servicio de login
    }
  }
}