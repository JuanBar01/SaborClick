import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports:[IonicModule,FormsModule, CommonModule],
})
export class PerfilPage {
  nombre: string = '';
  email: string = '';
  usuario: any = null;

  constructor(private perfilService: PerfilService) {}

  login() {
    const data = {
      name: this.nombre,
      email: this.email
    };

    this.perfilService.loginOcrear(data).subscribe({
      next: res => {
        this.usuario = res.user;
      },
      error: err => {
        console.error('Error al iniciar sesión o crear usuario:', err);
      }
    });
  }
}

