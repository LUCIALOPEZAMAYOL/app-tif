
export interface ProductData {
  id?: string;
  code?: String;
  name?: String;
  stock?: number;
  price?: number;
  description?: string;
  image?: String;

  category: Category;

  state?: boolean;
}

export interface Category {
  name?: string;
}
