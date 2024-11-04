import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CarrinhoComponent implements OnInit {
  cartItems: Dish[] = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(private dishService: DishService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.dishService.getCartItems().subscribe((data: Dish[]) => {
      this.cartItems = data;
      this.calculateTotals();
    });
  }

  deleteItem(id: number): void {
    this.dishService.deleteCartItem(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    this.total = this.subtotal + 5; 
  }

  navigateToAddItems(): void {
    this.router.navigate(['']); 
  }

  navigateToInfo(): void {
    this.router.navigate(['/info']); 
  }

  prosseguirParaCozinha(): void {
    this.dishService.moveCartToOrders().subscribe({
      next: () => {
        console.log("Itens do carrinho movidos para pedidos e enviados para a cozinha");
        this.cartItems = [];
        this.calculateTotals();
        this.router.navigate(['/cozinha']); // Redireciona para a tela da cozinha
      },
      error: (error) => {
        console.error("Erro ao mover itens do carrinho para pedidos", error);
      }
    });
  }
}
