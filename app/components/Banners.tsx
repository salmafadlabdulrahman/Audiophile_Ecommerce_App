import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Banners = () => {
  return (
    <div className="mt-5">
      <div className="relative">
        <div className="bg-orange text-white text-center rounded-xl relative pb-[4em] ">
          <div className="lg:flex items-center justify-center gap-5 ">
            <Image
              src={"/assets/home/desktop/pattern-circles.svg"}
              alt="circles pattern"
              width={50}
              height={50}
              className="z-[20px] absolute w-[900px]"
            />
            <div>
              <Image
                src={"/assets/home/desktop/image-speaker-zx9.png"}
                alt="speaker"
                width={200}
                height={200}
                className="relative z-[550px] m-auto top-[40px] lg:w-[400px] lg:top-[71px] object-contain"
                unoptimized
              />
            </div>

            <div className="lg:text-left lg:pl-5 lg:flex flex-col items-end lg:w-[50%]">
              <div>
                <h2 className="text-[4em] font-bold mt-[1.3em] leading-[60px]">
                  ZX9 <br />
                  SPEAKER
                </h2>
                <p className="font-extralight mt-5 m-auto ">
                  Upgrade to premium speakers that are phenomenally built
                  <br /> to deliver truly remarkable sound.
                </p>
                <Link href={"/products/speakers/zx9-speaker"}>
                  <Button className="bg-black text-white mt-[2em] w-[150px] h-[45px] uppercase font-bold tracking-widest z-[200px] relative">
                    See Product
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[2em] relative w-full ">
          <Image
            src={"/assets/home/tablet/image-speaker-zx7.jpg"}
            alt="gray speaker"
            width={100}
            height={100}
            className="w-full object-contain rounded-xl lg:hidden"
            unoptimized
          />

          <Image
            src={"/assets/home/desktop/image-speaker-zx7.jpg"}
            alt="gray speaker"
            width={100}
            height={100}
            className=" hidden lg:block w-full object-contain rounded-xl"
            unoptimized
          />

          <div className="absolute xs:top-[10%] sm:top-[35%] left-[30px]">
            <p className="font-bold text-[1.7em]">ZX7 SPEAKER</p>
            <Link href={"/products/speakers/zx7-speaker"}>
              <Button className="bg-transparent text-black hover:text-white border mt-[1.5em] w-[180px] h-[45px] uppercase font-bold tracking-widest z-[200px]">
                See Product
              </Button>
            </Link>
          </div>
        </div>

        <div className="sm:flex sm:flex-row gap-4 mt-5">
          <Image
            src={"/assets/home/mobile/image-earphones-yx1.jpg"}
            alt="wireless headphones"
            width={100}
            height={100}
            className="xs:w-full sm:w-[50%] rounded-lg border object-cover"
            unoptimized
          />
          <div className="bg-gray rounded-lg pl-3 md:pl-[3em] py-5 w-full flex flex-col justify-center xs:mt-3 sm:mt-0">
            {" "}
            <p className="text-[1.7em] font-bold uppercase">Yx1 earphones</p>
            <Link href={"/products/earphones/yx1-earphones"}>
              <Button className="bg-transparent text-black hover:text-white border mt-[1.5em] w-[180px] h-[45px] uppercase font-bold tracking-widest">
                {" "}
                See Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;
