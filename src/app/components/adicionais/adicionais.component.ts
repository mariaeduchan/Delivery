import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adicionais',
  templateUrl: './adicionais.component.html',
  styleUrls: ['./adicionais.component.css']
})
export class AdicionaisComponent implements OnInit {
  produto?: Dish;
  quantidade: number = 1;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dishService.getDish(+id).subscribe((data: Dish) => {
        this.produto = data;
      });
    }
  }

  updateQuantity(amount: number): void {
    if (this.quantidade + amount > 0) {
      this.quantidade += amount;
    }
  }

  addToCart(): void {
    if (this.produto) {
      const cartItem = { ...this.produto, quantity: this.quantidade };
      this.dishService.addToCart(cartItem).subscribe(() => {
        this.router.navigate(['/carrinho']);
      });
    }
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }
}
