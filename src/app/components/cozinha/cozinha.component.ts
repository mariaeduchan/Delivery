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
  orders: Dish[] = [];
  selectedStatus: { [key: number]: string } = {};

  constructor(private dishService: DishService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.dishService.getOrders().subscribe((data: Dish[]) => {
      this.orders = data;
    });
  }

  getStatusClass(orderId: number): string {
    const status = this.selectedStatus[orderId] || 'STATUS';
    return status.toLowerCase();
  }

  selectStatus(event: Event, orderId: number, status: string): void {
    event.preventDefault();
    this.selectedStatus[orderId] = status;
  }
}
