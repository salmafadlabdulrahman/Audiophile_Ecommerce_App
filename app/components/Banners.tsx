import { Button } from "@/components/ui/button";
import Image from "next/image";

const Banners = () => {
  return (
    <div className="mt-5">
      <div className="relative">
        {/*orange banner */}
        <div className="bg-orange text-center text-white rounded-xl relative pb-[4em] ">
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

            <div className="lg:text-left lg:pl-5 lg:flex flex-col items-end w-[50%]">
              <div>
                <h2 className="text-[4em] font-bold mt-[1.3em] leading-[60px]">
                  ZX9 <br />
                  SPEAKER
                </h2>
                <p className="font-extralight mt-5 m-auto ">
                  Upgrade to premium speakers that are phenomenally built
                  <br /> to deliver truly remarkable sound.
                </p>
                <Button className="bg-black text-white mt-[2em] w-[150px] h-[45px] uppercase font-bold tracking-widest z-[200px] relative">
                  See Product
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/*grey banner */}
        {/*two banners here */}
      </div>
    </div>
  );
};

export default Banners;
