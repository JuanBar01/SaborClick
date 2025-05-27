import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservasPage } from './reservas.page';

describe('ReservasPage', () => {
  let component: ReservasPage;
  let fixture: ComponentFixture<ReservasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasPage], // aquí va en imports, no en declarations
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert if no date is selected', () => {
    spyOn(window, 'alert');
    component.selectedDateTime = '';
    component.confirmReservation();
    expect(window.alert).toHaveBeenCalledWith('Selecciona una fecha y hora');
  });

  it('should confirm reservation when a date is selected', () => {
    spyOn(window, 'alert');
    component.selectedDateTime = new Date().toISOString();
    component.confirmReservation();
    expect(component.nextReservation).toBeTruthy();
    expect(window.alert).toHaveBeenCalledWith('Reserva confirmada');
  });

  it('should update selectedDateTime on date change', () => {
    const event = { detail: { value: '2025-05-27T15:00' } };
    component.onDateChange(event);
    // Puedes agregar expect si quieres verificar algo
  });
});
