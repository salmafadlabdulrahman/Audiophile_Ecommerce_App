import Header from "@/app/components/Header";
import Product from "@/app/components/Product";
import Products from "@/app/components/Products";
import data from "@/products.json";

import { FC } from 'react';

interface PageProps {
  params: {
    category: string;
  };
}

export type ParamsType = Promise<{ category: string }>;

export default async function Page({ params }: { params: ParamsType }) {
  const { category } = await params;
  const product = data.products.filter((item) => item.category === category);

  return (
    <div>
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
      </div>
    </div>
  );
}

//export default Page;