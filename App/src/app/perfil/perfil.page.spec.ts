import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { PerfilService } from '../services/perfil.service';
import { of, throwError } from 'rxjs';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let perfilServiceSpy: jasmine.SpyObj<PerfilService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PerfilService', ['loginOcrear']);

    await TestBed.configureTestingModule({
      imports: [PerfilPage],  // 👈 Aquí va en imports porque es standalone
      providers: [
        { provide: PerfilService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    perfilServiceSpy = TestBed.inject(PerfilService) as jasmine.SpyObj<PerfilService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginOcrear and set usuario on success', () => {
    const mockResponse = { user: { name: 'Juan', email: 'juan@mail.com' } };
    perfilServiceSpy.loginOcrear.and.returnValue(of(mockResponse));

    component.nombre = 'Juan';
    component.email = 'juan@mail.com';
    component.login();

    expect(perfilServiceSpy.loginOcrear).toHaveBeenCalledWith({ name: 'Juan', email: 'juan@mail.com' });
    expect(component.usuario).toEqual(mockResponse.user);
  });

  it('should handle error on loginOcrear failure', () => {
    const errorResponse = new Error('Error');
    perfilServiceSpy.loginOcrear.and.returnValue(throwError(() => errorResponse));

    spyOn(console, 'error');
    component.nombre = 'Juan';
    component.email = 'juan@mail.com';
    component.login();

    expect(perfilServiceSpy.loginOcrear).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error al iniciar sesión o crear usuario:', errorResponse);
  });
});
