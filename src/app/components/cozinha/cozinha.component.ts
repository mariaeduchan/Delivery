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
      console.log(`Dish ID: ${dishId}, Status: ${status}`);
      // Adicione a lógica para atualizar o status do prato aqui, se necessário
    }
  }
}


