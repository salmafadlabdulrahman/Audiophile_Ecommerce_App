"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = ["home", "headphones", "speakers", "earphones"];

interface NavItemsProps {
  textSize: string;
  gap: string;
  flexwrap?: boolean;
}

const NavItems = ({ textSize, gap, flexwrap }: NavItemsProps) => {
  return (
    <ul
      className="flex"
      style={{ gap: gap, flexWrap: flexwrap ? "wrap" : "nowrap" }}
    >
      {navItems.map((item, i) => (
        <Link href={`${item === "Home" ? "/" : `/pages/${item}` }`} key={i}>
          <motion.li
            whileHover={{
              color: "#d87d41",
            }}
            transition={{
              duration: 0.3,
            }}
            style={{ fontSize: textSize }}
            className={`text-white cursor-pointer category-text uppercase`}
          >
            {item}
          </motion.li>
        </Link>
      ))}
    </ul>
  );
};

export default NavItems;
