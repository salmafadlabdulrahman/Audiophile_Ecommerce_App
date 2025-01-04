import Image from "next/image";

const MiniProductCard = () => {
  return (
    <div className="flex justify-between mb-5">
      <div className="flex gap-6">
        <Image
          src={"/assets/cart/image-xx99-mark-one-headphones.jpg"}
          alt="headphones"
          width={50}
          height={50}
          unoptimized
          className="w-[60px] rounded-lg"
        />

        <div>
          <p className="font-bold">ZX9</p>
          <p className="text-darkGray font-bold">$ 4.500</p>
        </div>
      </div>
      <p className="text-darkGray font-bold">x3</p>
    </div>
  );
};

export default MiniProductCard;
