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
import { useUser } from "../context/UserContext";
import { databases, Query } from "@/lib/appwrite";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);
  const [accountManagementMenu, setAccountManagementMenu] = useState(false);
  const { user, logout } = useUser();
  const [cartProducts, setCartProducts] = useState<
    { productId: string; name: string; amount: number; price: number }[]
  >([]);

  const getProduct = async () => {
    try {
      if (!user?.id) {
        console.log("user doesn't exist");
        return;
      }
      const cart = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
        process.env.NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID as string,
        [Query.equal("userId", user.id)]
      );

      if (cart.total === 0) {
        setCartProducts([]);
        return;
      }

      const cartItems = cart.documents[0].items.map((item: string) =>
        JSON.parse(item)
      );
      setCartProducts(cartItems);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="flex items-center gap-6">
            <div
              className={`${user ? "block" : "hidden"} flex items-center gap-5`}
            >
              {" "}
              <Image
                src={"/assets/shared/desktop/icon-cart.svg"}
                alt="cart icon"
                width={25}
                height={25}
                onClick={() => {
                  setCartMenu((prev) => !prev);
                  setAccountManagementMenu(false);
                  getProduct();
                }}
                className="cursor-pointer"
              />
            </div>
            <div>
              {user && (
                <div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setAccountManagementMenu((prev) => !prev);
                      setCartMenu(false);
                    }}
                  >
                    <div className="bg-white font-bold text-black w-[37px] h-[37px] flex flex-col justify-center items-center rounded-full">
                      {user.name.slice(0, 2)}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {accountManagementMenu && (
              <div className="absolute right-[30px] lg:right-[17%] rounded-lg top-[80px] w-[50%] max-w-[250px] bg-white p-3">
                <button
                  className="flex items-center gap-3 p-3"
                  onClick={() => {
                    logout();
                    setAccountManagementMenu(false);
                  }}
                >
                  <p className="font-bold tracking-wide">Logout</p>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {!user && (
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
          )}{" "}
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
                {!user && (
                  <div className="flex gap-5 justify-end pr-[2em] mt-[1em] post-sm:hidden">
                    <Link
                      href={"/sign-in"}
                      className="underline"
                      onClick={() => setOpenMenu((prev) => !prev)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href={"/sign-up"}
                      className="underline"
                      onClick={() => setOpenMenu((prev) => !prev)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

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
          <CartList
            setOpenMenu={setOpenMenu}
            setCartMenu={setCartMenu}
            products={cartProducts}
          />
        )}
      </div>
    </>
  );
};

export default Navbar;
