export interface CategoryCardProps {
  image: string;
  category: string;
  navbar?: boolean;
}

export interface Item {
  product: ProductProps;
}

export interface ProductProps {
  categoryImage: Images;
  name: string;
  description: string;
}

export interface Images {
  mobile: string;
  tablet: string;
  desktop: string;
}
