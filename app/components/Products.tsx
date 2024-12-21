import { products } from "@/data";
import CategoryCard from "./CategoryCard";

const Products = () => {
  return (
    <div className="mt-[4em] pb-10 lg:flex justify-center ">
      <div className="flex items-center gap-3">
        {products.map((product) => (
          <CategoryCard category={product.category} image={product.image} />
        ))}
      </div>
    </div>
  );
};

export default Products;