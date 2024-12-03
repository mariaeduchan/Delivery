export interface OrderItem {
    id?: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    observacao?: string;
  }
  
  export interface Order {
    id?: number;
    status: string;
    items: OrderItem[];
  }