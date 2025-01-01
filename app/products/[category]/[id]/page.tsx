import ProductAmount from "@/app/components/ProductAmount";
import { Button } from "@/components/ui/button";
import data from "@/products.json";
import Image from "next/image";
import Link from "next/link";

export type ParamsType = Promise<{ id: string; category: string }>;

const page = async ({ params }: { params: ParamsType }) => {
  const { category, id } = await params;
  const item = data.products.filter((item) => item.id === parseInt(id))[0];
  return (
    <div className="w-[95%] m-auto mt-[2em]">
      <Link
        href={`/products/${category}`}
        className="text-lightBlack tracking-wide font-semibold text-[1.1em]"
      >
        Go Back
      </Link>
      <div className="flex flex-col items-center text-center">
        <Image
          src={item.categoryImage.mobile}
          alt={item.name}
          width={90}
          height={90}
          className="w-[85%] mt-[2em] rounded-lg"
          unoptimized
        />
        <div className="mt-[2.5em]">
          <p className="uppercase font-bold text-[2em] tracking-wide">
            {item.name}
          </p>
          <p className="mt-[1em] text-darkGray">{item.description}</p>
          <div className="flex items-center justify-between mt-[2em]">
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
      <div className="mt-[3em]">
        <p className="uppercase text-[1.4em] font-bold">Features</p>
        <p className="mt-[1em] text-darkGray">{item.features}</p>

        <div className="flex justify-between mt-[2em]">
          <p className="uppercase font-bold text-[1.3em]">In The Box</p>
          <div>
            {item.includedItems.map((item, i) => (
              <div key={i} className="flex gap-4 mb-2">
                <p className="text-orange font-semibold">{item.quantity}X</p>
                <p className="text-darkGray">{item.item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-[5em] gap-2 h-[250px]">
          <div className="flex flex-col h-full justify-between">
            <Image
              src={item.gallery.first.mobile}
              alt={item.name}
              width={40}
              height={40}
              unoptimized
              className="w-[210px] rounded-lg"
            />
            <Image
              src={item.gallery.second.mobile}
              alt={item.name}
              width={40}
              height={40}
              unoptimized
              className="w-[210px] rounded-lg"
            />
          </div>
          <Image
            src={item.gallery.third.mobile}
            alt={item.name}
            width={40}
            height={40}
            unoptimized
            className="object-contain w-[220px] h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
