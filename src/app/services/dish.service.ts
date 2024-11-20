import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
  observacao?: string;
  status?: string;
  cartItemId?: string;
  orderId?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:3000/dishes';
  private cartUrl = 'http://localhost:3000/cart';
  private ordersUrl = 'http://localhost:3000/orders';
  private kitchenUrl = 'http://localhost:3000/kitchen';

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  createDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl, dish);
  }

  updateDish(id: string, dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}`, dish);
  }

  deleteDish(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addToCart(item: Dish): Observable<Dish> {
    item.cartItemId = uuidv4(); 
    item.id = item.cartItemId; 
    return this.http.post<Dish>(this.cartUrl, item);
  }
  
  getCartItems(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.cartUrl);
  }

  deleteCartItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.cartUrl}/${id}`);
  }

  placeOrder(order: Dish[]): Observable<any> {
    return this.http.post<Dish[]>(this.ordersUrl, order);
  }

  getOrders(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.ordersUrl);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.cartUrl);
  }

  moveCartToKitchen(): Observable<any> {
    return this.getCartItems().pipe(
      switchMap((cartItems: Dish[]) => {
        const orderId = uuidv4(); 
        const orderWithOrderId = cartItems.map(item => ({ ...item, orderId }));
        return this.http.post(this.kitchenUrl, orderWithOrderId).pipe(
          switchMap(() => this.clearCart())
        );
      })
    );
  }
}
