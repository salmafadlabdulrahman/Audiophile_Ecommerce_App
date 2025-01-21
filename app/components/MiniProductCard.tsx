import { Product } from "@/index";
import Image from "next/image";
import data from "@/products.json";


const MiniProductCard = ({ name, price, amount }: Product) => {
  const productData = data.products.find((item) => item.name === name);
  
  return (
    <div className="justify-between mb-5 flex xs:flex-col sm:flex-row">
      <div className="flex gap-6">
        <Image
          src={
            productData?.cartImage || "/assets/cart/image-xx59-headphones.jpg"
          }
          alt={name || "Product"}
          width={70}
          height={70}
          className="rounded-lg"
        />

        <div>
          <p className="font-bold">{name?.split(" ")[0]}</p>
          <p className="text-darkGray font-bold">$ {price}</p>
        </div>
      </div>
      <p className="text-darkGray font-bold xs:hidden sm:block">x{amount}</p>
    </div>
  );
};

export default MiniProductCard;
