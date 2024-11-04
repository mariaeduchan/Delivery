import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adicionais',
  templateUrl: './adicionais.component.html',
  styleUrls: ['./adicionais.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdicionaisComponent implements OnInit {
  produto?: Dish;
  quantidade: number = 1;
  observacao: string = '';

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
      const cartItem = { ...this.produto, quantity: this.quantidade, observacao: this.observacao };
      this.dishService.addToCart(cartItem).subscribe({
        next: () => {
          this.router.navigate(['/carrinho']);
        },
        error: (error) => {
          console.error('Erro ao adicionar ao carrinho:', error);
        }
      });
    }
  }

  navigateBack(): void {
    this.router.navigate(['']);
  }
}
