import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Dish {
  id?: number;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:8080/dishes'; // Ajuste a URL da API conforme necessário

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    // Simulando pedidos fictícios
    const fakeDishes: Dish[] = [
      {
        id: 1212,
        name: 'Cheddar Burguer',
        description: 'Pão, 1 carne, 3 fatias de queijo cheddar, tomate, alface e cebola',
        price: 12.99
      },
      {
        id: 1452,
        name: 'Chicken Burguer',
        description: 'Pão, filé de frango, 1 fatia de queijo, tomate, alface e cebola',
        price: 15.99
      }
    ];
    return of(fakeDishes); // Usando 'of' para retornar um Observable com os dados fictícios
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  createDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl, dish);
  }

  updateDish(id: number, dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}`, dish);
  }

  deleteDish(id: number): Observable<void> { // Ajuste aqui
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
