
export interface ProductData {
  id?: string;
  code?: string;
  name?: string;
  stock?: number;
  price?: number;
  description?: string;
  image?: string;

  category: Category;

  state?: boolean;
}

export interface Category {
  name?: string;
}
