export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
