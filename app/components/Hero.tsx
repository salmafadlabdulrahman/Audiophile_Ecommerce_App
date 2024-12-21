import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-black text-center relative pb-[4em] ">
      <div className="lg:flex items-center justify-between lg:pt-[3em] xl:m-auto"> 
        <div className="left-0 right-0 top-[90px] lg:text-left lg:pl-[3em] absolute lg:w-[50%] lg:left-[5%] xl:left-[13%] lg:top-[30%]"> 
          <p className="text-lightGray font-semibold text-[.9em] uppercase tracking-[.4em] ">
            New Product
          </p>
          <h1 className="xs:text-[2.5em] sm:text-[3.5em]  text-white text-[3em] font-semibold sm:leading-[3.5rem] xs:leading-[3rem] mt-7 ">
            XX99 MARK II <br />
            HEADPHONES
          </h1>
          <p className="text-lightGray mt-9 tracking-wide w-[90%] lg:w-full m-auto lg:m-0 lg:mt-6">
            Experience natural, lifelike audio and exceptional build <br className="" />
            quality made for the passionate music enthusiast.
          </p>
          <Button className="bg-orange hover:bg-white hover:text-black w-[150px] h-[45px] mt-9 uppercase font-bold tracking-widest">
            See Product
          </Button>
        </div>
        <div className="w-full">
          <Image
            src={"/assets/home/mobile/old-image-hero.jpg"}
            alt="black headphones"
            width={260}
            height={260}
            className="m-auto md:hidden w-[500px] max-w-[100%] "
            unoptimized
          />
          <Image
            src={"/assets/home/tablet/image-hero.png"}
            alt="black headphones"
            width={100}
            height={100}
            className="m-auto hidden md:block w-[750px] max-w-[900px] lg:hidden"
            unoptimized
          />

          <Image
            src={"/assets/home/desktop/image-hero.jpg"}
            alt="black headphones"
            width={200}
            height={200}
            className="m-auto hidden lg:block object-contain w-[1200px]"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;