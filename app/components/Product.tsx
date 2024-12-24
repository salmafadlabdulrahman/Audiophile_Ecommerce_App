import { Button } from "@/components/ui/button";
import { Item } from "@/index";
import Image from "next/image";

const Product = ({ product }: Item) => {
  return (
    <div className="flex flex-col items-center mt-[4em]">
      <div>
        <Image
          src={product.image.mobile}
          alt="name"
          width={100}
          height={100}
          className="object-contain w-[350px] rounded-lg "
          unoptimized
        />
      </div>

      <div className="text-center">
        <p className="uppercase tracking-[.6em] text-orange mt-[1em]">
          New Product
        </p>
        <p className="mt-[1em] font-bold text-[2em] uppercase w-[70%] m-auto leading-[2.4rem]">
          {product.name}
        </p>
        <p className="mt-[1.5em] text-darkGray w-[80%] m-auto">
          {product.description}
        </p>
        <Button className="bg-orange hover:bg-black hover:text-white mt-9 w-[150px] h-[45px] uppercase font-bold tracking-widest">
          See Product
        </Button>
      </div>
    </div>
  );
};

export default Product;
