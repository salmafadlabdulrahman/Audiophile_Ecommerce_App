export interface CategoryCardProps {
  image: string;
  category: string;
  navbar?: boolean;
  setOpenMenu?: (val: boolean) => void;
}

export interface Item {
  product: ProductProps;
  index: number;
}

export interface ProductProps {
  categoryImage: Images;
  name: string;
  description: string;
  id: number;
  category: string;
  slug: string;
}

export interface Images {
  mobile: string;
  tablet: string;
  desktop: string;
}

export type LoggedInUser = {
  //might be deleted later
  username: string;
  email: string;
  id: string;
} | null;

export type User = {
  id: string;
  email: string;
  name: string;
} | null;

export type Product = {
  productId: string;
  name: string;
  price: number;
  amount: number;
};

export interface ProductAmountProps {
  id: string;
  name: string;
  price: number;
  addToCartBtn?: boolean;
  productAmount?: number;
}

export interface Cart {
  items: Product[];
  total: number;
}

export interface ProductPageProps {
  id: string;
  name: string;
  price: number;
}
