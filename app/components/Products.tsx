import { products } from "@/data";
import CategoryCard from "./CategoryCard";

const Products = () => {
  return (
    <div className="mt-[6em] mb-[10em] pb-10 ">
      <div className="pre-md:flex gap-3 ">
        {products.map((product) => (
          <CategoryCard category={product.category} image={product.image} />
        ))}
      </div>
    </div>
  );
};

export default Products;
