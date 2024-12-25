import Header from "@/app/components/Header";
import data from "../../../products.json";
import Product from "@/app/components/Product";
import Products from "@/app/components/Products";

const speakers = data.products.filter(
    (item) => item.category === "speakers"
  );
  
const page = () => {
  return (
    <div>
      <Header category="Speakers" />
      <div className="w-[90%] m-auto xl:w-[70%]">
        {speakers.map((item, i) => (
          <div key={i}>
            <Product product={item} index={i} />
          </div>
        ))}
        <div className="pt-[10em]">
          <Products />
        </div>
      </div>
    </div>
  );
};

export default page;
