"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = ["Home", "Headphones", "Speakers", "Earphones"];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  console.log(openMenu)
  return (
    <nav className="bg-black px-6 py-8">
      <div className="flex items-center justify-between xl:max-w-[70%] xl:m-auto">
        {/*hamburger icon - mobile only */}
        <div className="flex items-center gap-10">
          <Image
            src={"/assets/shared/mobile/icon-hamburger.svg"}
            alt="hamburger icon"
            width={18}
            height={18}
            unoptimized
            className="md:hidden cursor-pointer"
            onClick={() => setOpenMenu((prev) => !prev)}
          />

          {/*logo icon - both */}
          <Image
            src={"/assets/shared/desktop/logo.svg"}
            alt="logo"
            width={132}
            height={132}
          />
        </div>

        {/*Nav items - desktop only */}
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
                className="text-white uppercase tracking-widest text-[.9em] font-semibold cursor-pointer"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/*cart icon - both */}
        <Image
          src={"/assets/shared/desktop/icon-cart.svg"}
          alt="cart icon"
          width={25}
          height={25}
        />
      </div>
    </nav>
  );
};

export default Navbar;
