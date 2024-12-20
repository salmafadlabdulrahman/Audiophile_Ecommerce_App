"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { products } from "../../data";
import CategoryCard from "./CategoryCard";

const navItems = ["Home", "Headphones", "Speakers", "Earphones"];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <nav className="relative bg-black px-6 py-8 z-30 border-[.5px] border-b-[#3d3d3d]">
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

            <Image
              src={"/assets/shared/desktop/logo.svg"}
              alt="logo"
              width={132}
              height={132}
            />
          </div>

          <div className="hidden md:block">
            <ul className="flex gap-8">
              {navItems.map((item, i) => (
                <motion.li
                  whileHover={{
                    color: "#d87d41",
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  key={i}
                  className="text-white text-[.9em] cursor-pointer category-text"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <Image
            src={"/assets/shared/desktop/icon-cart.svg"}
            alt="cart icon"
            width={25}
            height={25}
          />
        </div>
      </nav>
      <div className="md:hidden">
        <AnimatePresence>
          {openMenu && (
            <>
              <motion.div
                className="absolute top-22 left-0 w-full bg-white z-30 pb-10 rounded-b-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex-col-center md:hidden">
                  {products.map((product) => (
                    <CategoryCard
                      category={product.category}
                      image={product.image}
                      key={product.category}
                    />
                  ))}
                </div>
              </motion.div>

              <div
                className="fixed inset-0 bg-black bg-opacity-50 "
                onClick={() => setOpenMenu(false)}
              ></div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
