import { Button } from "@/components/ui/button";
import { Item } from "@/index";
import Image from "next/image";

const Product = ({ product, index }: Item) => {
  console.log(index);
  return (
    <div className={`flex flex-col items-center mt-[4em] lg:flex-row lg:gap-[4em]`}>
      <div className={`${index % 2 !== 0 ? "xl:order-2" : "xl:order-1"}`}>
        <Image
          src={product.categoryImage.mobile}
          alt="name"
          width={100}
          height={100}
          className="object-contain w-[350px] rounded-lg md:hidden lg:block lg:w-[1300px]"
          unoptimized
        />
        <Image
          src={product.categoryImage.tablet}
          alt="name"
          width={100}
          height={100}
          className="rounded-lg hidden md:block w-full lg:hidden"
          unoptimized
        />
      </div>

      <div className={`text-center lg:text-left ${index % 2 !== 0 ? "xl:order-1" : "xl:order-2"}`}>
        <p className="uppercase tracking-[.6em] text-orange mt-[1em]">
          New Product
        </p>
        <p className="mt-[1em] font-bold text-[2em] uppercase w-[70%] m-auto lg:m-0 lg:mt-[1em] leading-[2.4rem]">
          {product.name}
        </p>
        <p className="mt-[1.5em] text-darkGray w-[80%] m-auto lg:m-0 lg:mt-[1em]">
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
