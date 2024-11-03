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
  selectedStatus: { [key: number]: string } = {};

  constructor(private dishService: DishService) {}

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

  getStatusClass(id: number): string {
    return this.selectedStatus[id] ? this.selectedStatus[id].toLowerCase() : '';
  }

  selectStatus(event: Event, id: number, status: string): void {
    event.preventDefault();
    this.selectedStatus[id] = status;
  }
}
