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
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDish();
  }

  private loadDish(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID obtido da rota:', id);
    
    if (id && !isNaN(+id)) {
      this.isLoading = true;
      this.dishService.getDish(+id).subscribe({
        next: (data: Dish) => {
          console.log('Prato recebido:', data);
          this.produto = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao obter prato:', error);
          this.errorMessage = 'Não foi possível carregar o prato. Por favor, tente novamente.';
          this.isLoading = false;
          setTimeout(() => this.router.navigate(['']), 3000);
        }
      });
    } else {
      console.error('ID não fornecido na rota ou inválido');
      this.errorMessage = 'ID do prato não fornecido ou inválido.';
      this.isLoading = false;
      setTimeout(() => this.router.navigate(['']), 3000);
    }
  }

  updateQuantity(amount: number): void {
    const newQuantity = this.quantidade + amount;
    if (newQuantity > 0 && newQuantity <= 10) {
      this.quantidade = newQuantity;
    }
  }

  addToCart(): void {
    if (this.produto && this.quantidade > 0) {
      const cartItem = { 
        ...this.produto, 
        quantity: this.quantidade, 
        observacao: this.observacao.trim() 
      };
      console.log('Adicionando ao carrinho:', cartItem);
      
      this.isLoading = true;
      this.dishService.addToCart(cartItem).subscribe({
        next: (response) => {
          console.log('Item adicionado ao carrinho:', response);
          this.router.navigate(['/info']); // Alterado para navegar para /info
        },
        error: (error) => {
          console.error('Erro ao adicionar ao carrinho:', error);
          if (error.status === 405) {
            this.errorMessage = 'Método não permitido. Verifique a configuração da API.';
          } else if (error.status === 0) {
            this.errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
          } else {
            this.errorMessage = 'Erro ao adicionar ao carrinho. Por favor, tente novamente.';
          }
          this.isLoading = false;
        }
      });
    } else {
      console.error('Tentativa de adicionar ao carrinho sem produto definido ou quantidade inválida');
      this.errorMessage = 'Erro: Produto não definido ou quantidade inválida.';
    }
  }

  navigateBack(): void {
    this.router.navigate(['']);
  }
}