import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';

export interface Dish {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
  observacao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = `${environment.apiUrl}/dishes`;
  private cartUrl = `${environment.apiUrl}/cart`;
  private ordersUrl = `${environment.apiUrl}/orders`;

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

  placeOrder(cartItems: Dish[]): Observable<any> {
    return this.http.post<any>(this.ordersUrl, cartItems);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
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

  updateOrderStatus(orderId: number, status: string): Observable<string> {
    return this.http.put<string>(`${this.ordersUrl}/${orderId}/status`, { status }, { responseType: 'text' as 'json' });
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.ordersUrl}/${orderId}`);
  }
}