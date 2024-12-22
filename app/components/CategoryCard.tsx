import { CategoryCardProps } from "@/index";
import Image from "next/image";

const CategoryCard = ({ image, category, navbar }: CategoryCardProps) => {
  return (
    <div
      className={`relative bg-gray rounded-lg p-4 text-center mt-[4em] ${navbar ? "w-[300px] max-w-[90%] " : "w-full md:h-[180px] "}  `} 
    > 
      <div className="absolute top-[-40px] left-0 right-0">
        <Image
          src={image}
          alt="product image"
          width={130}
          height={130}
          className="m-auto "
        />
      </div>
      <div className="mt-[4em]">
        <h2 className="text-black font-bold uppercase tracking-widest text-[.9em] md:text-[1.1em]">
          {category}
        </h2>
        <div className="flex items-center gap-2 justify-center mt-3 cursor-pointer">
          <p className="text-center text-[13px] text-darkGray category-text hover:text-orange">
            Shop{" "}
          </p>
          <Image
            alt="right arrow"
            src={"/assets/shared/desktop/icon-arrow-right.svg"}
            width={8}
            height={8}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
