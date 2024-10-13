import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  pedidos = [
    {
      id: 1212,
      itens: [
        { nome: 'Cheddar Burguer', quantidade: 2, descricao: 'Pão, 1 carne, 3 fatias de queijo cheddar, tomate, alface e cebola' },
        { nome: 'Suco', quantidade: 3, descricao: 'Laranja 600ML' }
      ]
    },
    {
      id: 1452,
      itens: [
        { nome: 'Cheddar Burguer', quantidade: 2, descricao: 'Pão, 1 carne, 3 fatias de queijo cheddar, tomate, alface e cebola' },
        { nome: 'Chicken Burguer', quantidade: 3, descricao: 'Pão, filé de frango, 1 fatia de queijo, tomate, alface e cebola' }
      ]
    }
  ];
}
