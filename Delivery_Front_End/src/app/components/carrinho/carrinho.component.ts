import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishService, Dish } from '../../services/dish.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CarrinhoComponent implements OnInit {
  cartItems: Dish[] = [];

  constructor(private dishService: DishService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.dishService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  deleteItem(id: number | undefined): void {
    if (id !== undefined) {
      this.dishService.deleteCartItem(id).subscribe(() => {
        this.loadCartItems();
      });
    }
  }

  clearCart(): void {
    this.dishService.clearCart().subscribe(() => {
      this.cartItems = [];
    });
  }

  placeOrder(): void {
    this.dishService.moveCartToOrders().subscribe(() => {
      this.cartItems = [];
      this.router.navigate(['/sucesso']);
    });
  }
}