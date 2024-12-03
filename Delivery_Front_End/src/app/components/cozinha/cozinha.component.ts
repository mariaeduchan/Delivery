import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishService } from '../../services/dish.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-cozinha',
  templateUrl: './cozinha.component.html',
  styleUrls: ['./cozinha.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CozinhaComponent implements OnInit {
  orders: Order[] = [];
  selectedStatus: { [key: number]: string } = {};

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.dishService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
        this.orders.forEach(order => {
          if (order.id !== undefined) {
            this.selectedStatus[order.id] = order.status;
          }
        });
      },
      error => {
        console.error('Erro ao carregar pedidos:', error);
      }
    );
  }

  selectStatus(event: Event, orderId: number | undefined, status: string): void {
    event.preventDefault();
    if (orderId !== undefined) {
      this.dishService.updateOrderStatus(orderId, status).subscribe(
        (responseStatus: string) => {
          this.selectedStatus[orderId] = responseStatus;
          console.log(`Status do pedido ${orderId} atualizado para ${responseStatus}`);
          
          // Atualiza o status do pedido na lista de pedidos
          const updatedOrder = this.orders.find(o => o.id === orderId);
          if (updatedOrder) {
            updatedOrder.status = responseStatus;
          }
        },
        error => {
          console.error('Erro ao atualizar o status:', error);
          this.selectedStatus[orderId] = this.orders.find(o => o.id === orderId)?.status || 'STATUS';
        }
      );
    }
  }

  getStatusButtonClass(orderId: number | undefined): string {
    if (orderId === undefined) return '';
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

  deleteOrder(orderId: number | undefined): void {
    if (orderId === undefined) return;
    if (confirm('Tem certeza que deseja deletar este pedido?')) {
      console.log(`Tentando deletar pedido ${orderId}`);
      this.dishService.deleteOrder(orderId).subscribe(
        () => {
          console.log(`Pedido ${orderId} deletado com sucesso`);
          this.orders = this.orders.filter(order => order.id !== orderId);
        },
        error => {
          console.error('Erro ao deletar o pedido:', error);
          console.error('URL da requisição:', error.url);
          console.error('Mensagem de erro:', error.message);
        }
      );
    }
  }
}