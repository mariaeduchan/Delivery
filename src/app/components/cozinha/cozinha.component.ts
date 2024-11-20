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
  selectedStatus: { [key: string]: string } = {}; // Alterado para string

  constructor(private dishService: DishService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.dishService.getOrders().subscribe((data: Dish[]) => { // Corrigido para buscar pedidos
      this.orders = data;
    });
  }

  getStatusClass(orderId: string): string {
    const status = this.selectedStatus[orderId] || 'STATUS';
    return status.toLowerCase();
  }

  selectStatus(event: Event, orderId: string, status: string): void {
    event.preventDefault();
    this.selectedStatus[orderId] = status;

    if (status === 'ENTREGUE') {
      setTimeout(() => {
        this.orders = this.orders.filter(order => order.id !== orderId);
      }, 2000); 
    }
  }

  getStatusButtonClass(orderId: string): string {
    const status = this.selectedStatus[orderId];
    switch (status) {
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
}
