<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
/>;
export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  rating: number;
  images: string[]; // Array of image URLs
  category: string;
  reviews?: Review[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: string;
}

export interface CartItem extends Product {
  quantity: number;
}
