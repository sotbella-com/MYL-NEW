export interface Product {
    category: string;
    name: string;
    size: string;
    material: string;
    color: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface OrderSummaryType {
    totalQuantity: number;
    selectedProducts: number;
    totalPrice: number;
  }
  