import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-black text-center relative">
      <div className="absolute left-0 right-0 top-[90px]">
        <p className="text-lightGray font-semibold text-[.9em] uppercase tracking-[.4em]">
          New Product
        </p>
        <h1 className="text-white text-[3em] font-semibold leading-[3.5rem] mt-7 ">
          XX99 MARK II <br />
          HEADPHONES
        </h1>
        <p className="text-lightGray mt-9 tracking-wide w-[90%] m-auto">
          Experience natural, lifelike audio and exceptional build <br />
          quality made for the passionate music enthusiast.
        </p>
        <Button className="bg-orange hover:bg-white hover:text-black w-[150px] h-[45px] mt-9 uppercase font-bold tracking-widest">
          See Product
        </Button>
      </div>
      <Image
        src={"/assets/home/mobile/old-image-hero.jpg"}
        alt="black headphones"
        width={260}
        height={260}
        className="m-auto  w-full object-contain"
        unoptimized
      />
    </div>
  );
};

export default Hero;
//image-hero.png
//absolute top-0
