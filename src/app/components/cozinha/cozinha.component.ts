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
    });
  }

  deleteDish(id: number) {
    this.dishService.deleteDish(id).subscribe(() => {
      this.loadDishes();
    });
  }

  selectStatus(dishId: number | undefined, status: string): void {
    if (dishId !== undefined) {
      this.selectedStatus[dishId] = status;
      console.log(`Dish ID: ${dishId}, Status: ${status}`);
    }
  }

  getStatusClass(dishId: number | undefined): string {
    if (dishId !== undefined) {
      switch (this.selectedStatus[dishId] || 'STATUS') {
        case 'FEITO':
          return 'feito';
        case 'ENVIADO P/ ENTREGA':
          return 'enviado';
        case 'ENTREGUE':
          return 'entregue';
        default:
          return '';
      }
    }
    return '';
  }
}
