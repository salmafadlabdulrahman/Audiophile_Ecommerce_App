"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { products } from "../../data";
import CategoryCard from "./CategoryCard";
import NavItems from "./NavItems";
import Link from "next/link";
import ProductAmount from "./ProductAmount";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);

  return (
    <>
      <nav className="relative bg-black px-6 py-8 z-[9999] border-[.5px] border-b-[#3d3d3d]">
        <div className="flex-row-between xl:max-w-[70%] xl:m-auto">
          <div className="flex items-center gap-10">
            <Image
              src={"/assets/shared/mobile/icon-hamburger.svg"}
              alt="hamburger icon"
              width={18}
              height={18}
              unoptimized
              className={`md:hidden cursor-pointer ${
                openMenu ? "hidden" : "block"
              }`}
              onClick={() => setOpenMenu((prev) => !prev)}
            />

            <Image
              src={"/assets/shared/mobile/icon-close-menu.svg"}
              alt="close icon"
              width={18}
              height={18}
              unoptimized
              className={`md:hidden cursor-pointer ${
                openMenu ? "block" : "hidden"
              }`}
              onClick={() => setOpenMenu((prev) => !prev)}
            />

            <Link href={"/"}>
              <Image
                src={"/assets/shared/desktop/logo.svg"}
                alt="logo"
                width={132}
                height={132}
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <NavItems textSize=".9em" gap="2rem" />
          </div>

          <Image
            src={"/assets/shared/desktop/icon-cart.svg"}
            alt="cart icon"
            width={25}
            height={25}
            onClick={() => setCartMenu((prev) => !prev)}
            className="cursor-pointer"
          />
        </div>
      </nav>
      <div className="md:hidden">
        <AnimatePresence>
          {openMenu && (
            <>
              <motion.div
                className="absolute top-22 left-0 w-full bg-white z-[9999] pb-10 rounded-b-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex-col-center md:hidden">
                  {products.map((product, i) => (
                    <CategoryCard
                      category={product.category}
                      image={product.image}
                      key={product.category}
                      navbar={true}
                      setOpenMenu={setOpenMenu}
                    />
                  ))}
                </div>
              </motion.div>

              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
                onClick={() => setOpenMenu(false)}
              ></div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        {cartMenu && (
          <div className="bg-white absolute top-[20px] z-[999999] right-[20px] w-[90%] max-w-[350px] px-8 py-5 rounded-lg ">
            <div className="flex items-center justify-between">
              <p className="uppercase font-bold tracking-wide text-[1.2em]">
                Cart (3)
              </p>
              <button className="tracking-wider text-darkGray">
                Remove All
              </button>
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
            <button className="bg-orange text-white uppercase font-bold w-full text-[1em] h-[45px] tracking-wide mt-[2em]">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
