'use client';
import { motion } from "framer-motion";

const navItems = ["Home", "Headphones", "Speakers", "Earphones"];

interface NavItemsProps {
    textSize: string;
    gap: string;
    flexwrap?: boolean;
}

const NavItems = ({textSize, gap, flexwrap}:NavItemsProps) => {
  return (
    <ul className="flex" style={{gap: gap, flexWrap: flexwrap ? "wrap" : "nowrap"}}>
      {navItems.map((item, i) => (
        <motion.li
          whileHover={{
            color: "#d87d41",
          }}
          transition={{
            duration: 0.3,
          }}
          key={i}
          style={{fontSize: textSize}}
          className={`text-white cursor-pointer category-text`} 
        > {/*text-[.9em] */}
          {item}
        </motion.li>
      ))}
    </ul>
  );
};

export default NavItems;
