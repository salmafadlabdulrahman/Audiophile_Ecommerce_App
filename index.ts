export interface CategoryCardProps {
  image: string;
  category: string;
  navbar?: boolean;
  setOpenMenu: (val: boolean) => void;
}

export interface Item {
  product: ProductProps;
  index: number;
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
