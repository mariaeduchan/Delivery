import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'; // Importando o switchMap

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
  observacao?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:3000/dishes';
  private cartUrl = 'http://localhost:3000/cart';
  private ordersUrl = 'http://localhost:3000/orders'; // URL para pedidos

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
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

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addToCart(item: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.cartUrl, item);
  }

  getCartItems(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.cartUrl);
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}/${id}`);
  }

  placeOrder(order: Dish[]): Observable<any> {
    return this.http.post<Dish[]>(this.ordersUrl, order);
  }

  getOrders(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.ordersUrl);
  }

  moveCartToOrders(): Observable<any> {
    return this.getCartItems().pipe(
      switchMap((cartItems: Dish[]) => this.placeOrder(cartItems).pipe(
        switchMap(() => this.clearCart())
      ))
    );
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.cartUrl);
  }
}
