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
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.total = this.subtotal + 10; // Valor de frete fixo
  }

  navigateToAddItems(): void {
    this.router.navigate(['/cardapio']); // Ajuste para navegar para a página de adicionar itens
  }
}