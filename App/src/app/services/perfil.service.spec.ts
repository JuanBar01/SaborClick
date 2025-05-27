import { TestBed } from '@angular/core/testing';
import { PerfilService } from './perfil.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PerfilService', () => {
  let service: PerfilService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerfilService],
    });
    service = TestBed.inject(PerfilService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya llamadas pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call loginOcrear and return the user', () => {
    const mockUser = { user: { name: 'Ana', email: 'ana@example.com' } };
    const userData = { name: 'Ana', email: 'ana@example.com' };

    service.loginOcrear(userData).subscribe(res => {
      expect(res).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8000/login_or_create/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);
    req.flush(mockUser);
  });

  it('should call obtenerUsuarios and return an array of users', () => {
    const mockUsers = [
      { name: 'Ana', email: 'ana@example.com' },
      { name: 'Luis', email: 'luis@example.com' }
    ];

    service.obtenerUsuarios().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8000/users/');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
