import Image from "next/image";
import MiniProductCard from "./MiniProductCard";
import { Button } from "@/components/ui/button";

const ConfirmedCard = () => {
  return (
    <div className=" bg-white absolute top-[20%] z-[2000000] left-0 right-0  w-[80%] m-auto max-w-[450px] rounded-lg">
      {" "}
      <div className="p-8">
        <Image
          src={"/assets/shared/desktop/icon-check-mark.svg"}
          alt="check mark"
          width={30}
          height={30}
          unoptimized
          className="w-[65px]"
        />
        <p className="uppercase mt-[1em] font-bold text-[1.5em]">
          Thank you <br /> for your order
        </p>
        <p className="mt-[1em] text-darkGray">
          You will receive an email confirmation shortly
        </p>

        <div className="mt-[2em] bg-gray rounded-lg ">
          <div className="p-4">
            <MiniProductCard />
          </div>
          <p className="text-darkGray text-center font-semibold tracking-wide">
            and 1 other item (s)
          </p>
          <div className="bg-black border w-full h-[90px] mt-[1.5em] rounded-b-lg p-4">
            <p className="summary-text text-lightGray">Grand Total</p>
            <p className="summary-amounts text-white">$ 14,698</p>
          </div>
        </div>
        <Button className="w-full mt-[2em] bg-orange uppercase tracking-wide font-semibold text-[1em]">
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default ConfirmedCard;
