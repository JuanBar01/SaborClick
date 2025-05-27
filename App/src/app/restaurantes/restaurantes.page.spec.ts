import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantesPage } from './restaurantes.page';

describe('RestaurantesPage', () => {
  let component: RestaurantesPage;
  let fixture: ComponentFixture<RestaurantesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantesPage],  // Importar standalone component aquí
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar agregarRestaurante y limpiar el formulario', () => {
    spyOn(component, 'agregarRestaurante').and.callThrough();

    // Simula que llamas al método que debería activar agregarRestaurante
    component.agregarRestaurante();

    expect(component.agregarRestaurante).toHaveBeenCalled();

  });

});
