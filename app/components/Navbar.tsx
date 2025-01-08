"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { products } from "../../data";
import CategoryCard from "./CategoryCard";
import NavItems from "./NavItems";
import Link from "next/link";
import CartList from "./CartList";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const [userId, setUserId] = useState(false);

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
              className={`pre-lg:hidden cursor-pointer ${
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
              className={`pre-lg:hidden cursor-pointer ${
                openMenu ? "block" : "hidden"
              }`}
              onClick={() => setOpenMenu((prev) => !prev)}
            />

            <Link href={"/"} className="pr-3">
              <Image
                src={"/assets/shared/desktop/logo.svg"}
                alt="logo"
                width={132}
                height={132}
              />
            </Link>
          </div>

          <div className="hidden pre-lg:block">
            <NavItems textSize=".9em" gap="2rem" />
          </div>

          <div
            className={`${userId ? "block" : "hidden"} flex items-center gap-5`}
          >
            <Image
              src={"/assets/shared/desktop/icon-cart.svg"}
              alt="cart icon"
              width={25}
              height={25}
              onClick={() => setCartMenu((prev) => !prev)}
              className="cursor-pointer"
            />
          </div>

          {!userId && (
            <div className="items-center gap-3 hidden post-sm:flex">
              <Link href={"/sign-in"}>
                <Button className="bg-white text-black font-semibold tracking-wide hover:bg-white hover:text-black">
                  Sign In
                </Button>
              </Link>

              <Link href={"/sign-up"}>
                <Button className="bg-white text-black font-semibold tracking-wide hover:bg-white hover:text-black">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="pre-lg:hidden">
        <AnimatePresence>
          {openMenu && (
            <>
              <motion.div
                className="absolute top-22 left-0 w-full bg-white z-[9999] pb-10 rounded-b-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex gap-5 justify-end pr-[2em] mt-[1em] post-sm:hidden">
                  <Link href={"/sign-in"} className="underline" onClick={() => setOpenMenu((prev) => !prev)}>
                    Sign In
                  </Link>
                  <Link href={"/sign-up"} className="underline" onClick={() => setOpenMenu((prev) => !prev)}>
                    Sign Up
                  </Link>
                </div>

                <div className="flex-col-center pre-lg:hidden">
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
          <CartList setOpenMenu={setOpenMenu} setCartMenu={setCartMenu} />
        )}
      </div>
    </>
  );
};

export default Navbar;
