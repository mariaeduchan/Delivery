import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cozinha',
  templateUrl: './cozinha.component.html',
  styleUrls: ['./cozinha.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CozinhaComponent implements OnInit {
  dishes: Dish[] = [];
  selectedStatus: { [key: number]: string } = {}; // Para armazenar o status selecionado por prato

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes() {
    this.dishService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      // Inicializa o status para todos os pratos
      data.forEach(dish => {
        if (dish.id !== undefined) {
          this.selectedStatus[dish.id] = 'STATUS'; // Valor inicial do status
        }
      });
    });
  }

  deleteDish(id: number) {
    this.dishService.deleteDish(id).subscribe(() => {
      this.loadDishes();
    });
  }

  selectStatus(event: Event, dishId: number | undefined, status: string): void {
    event.preventDefault(); // Impede a navegação
    if (dishId !== undefined) {
      this.selectedStatus[dishId] = status;
      console.log(`Dish ID: ${dishId}, Status: ${status}`);
    }
  }

  getStatusClass(dishId: number | undefined): string {
    if (dishId !== undefined) {
      switch (this.selectedStatus[dishId]) {
        case 'FEITO':
          return 'FEITO';
        case 'ENVIADO P/ ENTREGA':
          return 'ENVIADO';
        case 'ENTREGUE':
          return 'ENTREGUE';
        default:
          return '';
      }
    }
    return '';
  }
}
