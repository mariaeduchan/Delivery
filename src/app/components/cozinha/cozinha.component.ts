import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cozinha',
  templateUrl: './cozinha.component.html',
  styleUrls: ['./cozinha.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CozinhaComponent implements OnInit {
  dishes: Dish[] = [];
  selectedStatus: { [key: number]: string } = {};

  constructor(private dishService: DishService, private router: Router) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void {
    this.dishService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
    });
  }

  deleteDish(id: number): void {
    this.dishService.deleteDish(id).subscribe(() => {
      this.dishes = this.dishes.filter(dish => dish.id !== id);
    });
  }

  getStatusClass(dishId: number): string {
    const status = this.selectedStatus[dishId] || 'STATUS';
    return status.toLowerCase();
  }

  selectStatus(event: Event, dishId: number, status: string): void {
    event.preventDefault();
    this.selectedStatus[dishId] = status;
  }
}
