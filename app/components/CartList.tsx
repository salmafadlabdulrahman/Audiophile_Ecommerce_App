import Image from "next/image";
import ProductAmount from "./ProductAmount";
import { Button } from "@/components/ui/button";

interface CartListProps {
  setOpenMenu: (val: boolean) => void;
  setCartMenu: (val: boolean) => void;
}

const CartList = ({ setOpenMenu, setCartMenu }: CartListProps) => {
  return (
    <>
      <div className="bg-white absolute top-[20px] z-[999999] right-[20px] w-[90%] max-w-[350px] px-8 py-5 rounded-lg ">
        <div className="flex items-center justify-between">
          <p className="uppercase font-bold tracking-wide text-[1.2em]">
            Cart (3)
          </p>
          <button className="tracking-wider text-darkGray">Remove All</button>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <Image
              src={"/assets/cart/image-xx59-headphones.jpg"}
              alt="headphones"
              width={70}
              height={70}
              className="rounded-lg"
            />

            <p className="text-center">
              <span className="font-semibold ">ZX9</span> <br />{" "}
              <span className="text-darkGray font-bold">$ 4,500</span>
            </p>

            <ProductAmount />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <Image
              src={"/assets/cart/image-xx59-headphones.jpg"}
              alt="headphones"
              width={70}
              height={70}
              className="rounded-lg"
            />

            <p className="text-center">
              <span className="font-semibold ">ZX9</span> <br />{" "}
              <span className="text-darkGray font-bold">$ 4,500</span>
            </p>

            <div className="bg-gray flex items-center justify-between  w-[110px] h-[40px]">
              <button className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]">
                -
              </button>
              <p className="font-bold ">1</p>
              <button className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]">
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex mt-[3em] items-center justify-between">
          <p className="uppercase text-darkGray">Total</p>
          <p className="font-semibold text-[1.1em]">$ 28,195</p>
        </div>
        <Button className="bg-orange text-white uppercase font-bold w-full text-[1em] h-[45px] tracking-wide mt-[2em]">
          Checkout
        </Button>
      </div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
        onClick={() => {
            setOpenMenu(false);
            setCartMenu(false)
        }}
      ></div>
    </>
  );
};

export default CartList;