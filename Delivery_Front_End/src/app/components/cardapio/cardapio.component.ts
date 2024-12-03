import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CardapioComponent implements OnInit {
  produtos: Dish[] = [];

  constructor(private dishService: DishService, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.dishService.getDishes().subscribe(
      (data: Dish[]) => this.produtos = data,
      (error) => console.error('Erro ao carregar produtos:', error)
    );
  }

  selectProduct(produto: Dish): void {
    this.router.navigate(['/adicionais', produto.id]);
  }

  navigateToCart(): void {
    this.router.navigate(['/carrinho']);
  }
}
