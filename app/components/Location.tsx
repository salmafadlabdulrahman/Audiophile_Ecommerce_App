import Image from "next/image";

const Location = () => {
  return (
    <div className="mt-[6em] lg:flex gap-[2em] ">
      <Image
        src={"/assets/shared/mobile/image-best-gear.jpg"}
        alt="a guy wearing headphones"
        width={50}
        height={50}
        className="w-full rounded-lg md:hidden"
        unoptimized
      />
      <Image
        src={"/assets/shared/tablet/image-best-gear.jpg"}
        alt="a guy wearing headphones"
        width={50}
        height={50}
        className="hidden w-full rounded-lg md:block lg:hidden"
        unoptimized
      />
      <Image
        src={"/assets/shared/desktop/image-best-gear.jpg"}
        alt="a guy wearing headphones"
        width={50}
        height={50}
        className="hidden w-[40%] rounded-lg lg:block order-2"
        unoptimized
      />
      <div className="mt-[2em] text-center lg:text-left lg:mt-[4em] lg:pl-[2em]">
        <p className="text-[2.5em] uppercase font-bold tracking-wide text-black">Bringing you the <br className="hidden lg:block" /><span className="text-orange">best</span> audio gear</p>
        <p className="mt-3 text-darkGray w-[90%]">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </div>
  );
};

export default Location;
