import { products } from "@/data";
import CategoryCard from "./CategoryCard";
import { div } from "framer-motion/client";

const Products = () => {
  return (
    <div className="mt-[6em] mb-[10em] pb-10 ">
      <div className="pre-md:flex gap-3 ">
        {products.map((product, i) => (
          <CategoryCard
            category={product.category}
            image={product.image}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
