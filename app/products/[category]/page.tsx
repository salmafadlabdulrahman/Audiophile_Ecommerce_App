import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Location from "@/app/components/Location";
import Product from "@/app/components/Product";
import Products from "@/app/components/Products";
import ProtectedRoutes from "@/app/ProtectedRoutes";
import data from "@/products.json";

export type ParamsType = Promise<{ category: string }>;

export default async function Page({ params }: { params: ParamsType }) {
  const { category } = await params;
  const product = data.products.filter((item) => item.category === category);

  return (
    <div>
      <ProtectedRoutes>
        <Header category={product[0]?.category} />

        <div className="w-[90%] m-auto xl:w-[70%]">
          {product?.map((item, i) => (
            <div key={i}>
              <Product product={item} index={i} />
            </div>
          ))}
          <div className="pt-[10em]">
            <Products />
          </div>

          <Location />
        </div>
        <Footer />
      </ProtectedRoutes>
    </div>
  );
}
