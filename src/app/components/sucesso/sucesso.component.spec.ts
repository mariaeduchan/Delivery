import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SucessoComponent } from './sucesso.component';

describe('SucessoComponent', () => {
  let component: SucessoComponent;
  let fixture: ComponentFixture<SucessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SucessoComponent,
        RouterTestingModule // Certifique-se de importar isso para testar o roteamento
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
