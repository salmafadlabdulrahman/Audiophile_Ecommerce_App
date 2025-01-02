import ProductAmount from "@/app/components/ProductAmount";
import Products from "@/app/components/Products";
import { Button } from "@/components/ui/button";
import data from "@/products.json";
import Image from "next/image";
import Link from "next/link";

export type ParamsType = Promise<{ name: string; category: string }>;

const page = async ({ params }: { params: ParamsType }) => {
  const { category, name } = await params;
  const item = data.products.filter(
    (item) => item.slug === name
  )[0];

  return (
    <div className="w-[95%] m-auto mt-[2em]">
      <Link
        href={`/products/${category}`}
        className="text-lightBlack tracking-wide font-semibold text-[1.1em]"
      >
        Go Back
      </Link>
      <div className="pt-[2em] flex flex-col items-center text-center md:flex-row md:gap-4 lg:gap-8 lg:max-w-[85%] xl:max-w-[75%] lg:m-auto lg:items-start">
        <Image
          src={item.categoryImage.mobile}
          alt={item.name}
          width={90}
          height={90}
          className="w-[85%] max-w-[350px] mt-[2em] rounded-lg lg:hidden"
          unoptimized
        />
        <Image
          src={item.categoryImage.desktop}
          alt={item.name}
          width={90}
          height={90}
          className="hidden lg:block w-[50%] max-w-[600px] rounded-lg"
          unoptimized
        />
        <div className="mt-[2.5em] md:text-left ">
          <p className="uppercase font-bold text-[2em] tracking-wide lg:text-[2.5em]">
            {item.name}
          </p>
          <p className="mt-[1em] text-darkGray sm:max-w-[80%] md:max-w-full m-auto">
            {item.description}
          </p>
          <div className="flex items-center justify-between mt-[2em] md:mt-[4em] lg:mt-[6em] xl:mt-[10em]">
            <p className="font-semibold text-[1.3em]">$ {item.price}</p>
            <div className="flex items-center gap-6">
              <ProductAmount />
              <Button className="uppercase font-semibold tracking-wider h-[40px]">
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[3em] lg:m-auto lg:mt-[7em]  lg:max-w-[85%] xl:max-w-[75%]">
        <div className="lg:flex justify-between">
          <div className="lg:w-[70%]">
            <p className="uppercase text-[1.4em] font-bold lg:text-[2em]">
              Features
            </p>
            <p className="mt-[1em] text-darkGray">{item.features}</p>
          </div>

          <div className="flex gap-9 mt-[2em] lg:flex-col lg:justify-normal lg:mt-0">
            <p className="uppercase font-bold text-[1.3em] lg:text-[2em]">
              In The Box
            </p>
            <div className="lg:mt-[1.5em]">
              {item.includedItems.map((item, i) => (
                <div key={i} className="flex gap-4 mb-2">
                  <p className="text-orange font-semibold">{item.quantity}X</p>
                  <p className="text-darkGray">{item.item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between m-auto mt-[10em]">
          <div className="flex flex-col gap-4">
            <Image
              src={item.gallery.first.mobile}
              alt={item.name}
              width={40}
              height={40}
              unoptimized
              className="w-[95%] h-[50%] object-cover rounded-lg"
            />
            <Image
              src={item.gallery.second.mobile}
              alt={item.name}
              width={40}
              height={40}
              unoptimized
              className="w-[95%] h-[50%] object-cover rounded-lg"
            />
          </div>
          <Image
            src={item.gallery.third.mobile}
            alt={item.name}
            width={40}
            height={40}
            unoptimized
            className="object-contain w-[50%] h-full rounded-lg"
          />
        </div>

        <div className="mt-[4em] uppercase font-bold text-center text-[1.5em] ">
          <p className="lg:text-[1.5em]">You may also like</p>

          <div className="flex flex-col items-center mt-[3em] lg:flex-row">
            {item.others.map((product, i) => (
              <div key={i} className="mb-[1.5em]">
                <Image
                  src={product.image.mobile}
                  alt={product.name}
                  width={50}
                  height={50}
                  unoptimized
                  className="w-[95%] m-auto rounded-lg lg:hidden"
                />
                <Image
                  src={product.image.desktop}
                  alt={product.name}
                  width={50}
                  height={50}
                  unoptimized
                  className="hidden w-[90%] m-auto rounded-lg lg:block"
                />
                <p className="mt-[.5em]">{product.name}</p>
                <Link href={`/products/${product.slug}`}>
                  <Button className="uppercase tracking-wider font-semibold my-[1.7em]">
                    See Product
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <Products />
      </div>
    </div>
  );
};

export default page;