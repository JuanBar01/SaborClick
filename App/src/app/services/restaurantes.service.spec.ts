import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService, Restaurante } from './restaurantes.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya llamadas pendientes
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener restaurantes (GET)', () => {
    const mockRestaurantes: Restaurante[] = [
      {
        id: 1,
        nombre: 'Restaurante Test',
        direccion: 'Calle Falsa 123',
        descripcion: 'Muy bueno',
        calificacion: 4.5,
        logo_path: 'http://localhost:8000/logos/logo1.png'
      }
    ];

    service.getRestaurantes().subscribe((restaurantes) => {
      expect(restaurantes.length).toBe(1);
      expect(restaurantes[0].nombre).toBe('Restaurante Test');
    });

    const req = httpMock.expectOne('http://localhost:8000/restaurants/');
    expect(req.request.method).toBe('GET');
    req.flush(mockRestaurantes);
  });

  it('debería agregar restaurante (POST)', () => {
    const fakeForm = new FormData();
    fakeForm.append('nombre', 'Nuevo Restaurante');

    const mockResponse: Restaurante = {
      id: 2,
      nombre: 'Nuevo Restaurante',
      direccion: 'Dirección Falsa',
      descripcion: 'Test',
      calificacion: 5
    };

    service.agregarRestaurante(fakeForm).subscribe((res) => {
      expect(res.nombre).toBe('Nuevo Restaurante');
    });

    const req = httpMock.expectOne('http://localhost:8000/restaurants/');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
