"use client";

import Image from "next/image";
import ProductAmount from "./ProductAmount";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import data from "@/products.json";
import { Product } from "@/index";
import { useCart } from "../context/CartContext";
import { formatNumber, removeAllProducts } from "@/functions";
import { databases } from "@/lib/appwrite";

interface CartListProps {
  setOpenMenu: (val: boolean) => void;
  setCartMenu: (val: boolean) => void;
  products: Product[];
}

const CartList = ({ setOpenMenu, setCartMenu }: CartListProps) => {
  const { user } = useUser();
  const { cart, fetchCart, total, setProductsCount, setCart } = useCart();

  useEffect(() => {
    if (!user?.id) {
      console.log("User doesn't exist");
      return;
    } else {
      fetchCart(user?.id);
    }
  }, []);

  /*const removeAllProducts = async () => {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
    const cartsCollectionId = process.env
      .NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID as string;
    try {
      const carts = await databases.listDocuments(
        databaseId,
        cartsCollectionId
      );

      if (carts.total === 0) {
        console.log("Cart is empty");
        return;
      }

      const deletePromises = carts.documents.map((doc) =>
        databases.deleteDocument(databaseId, cartsCollectionId, doc?.$id)
      );
      await Promise.all(deletePromises);
      setProductsCount(0);
      setCart([]);
      console.log("All items have been removed");
    } catch (error) {
      console.log("deleteing items failed", error);
    }
  };*/

  const handleRemovingProducts = async () => {
    try {
      await removeAllProducts();
      setProductsCount(0);
      setCart([]);

    } catch (error) {
      console.log("deleteing items failed", error);
    }
  }
  return (
    <>
      <div className="bg-white absolute top-[20px] z-[999999] right-[30px] md:right-[60px] lg:right-[10%] xl:right-[20%] w-[90%] max-w-[350px] px-8 py-5 rounded-lg ">
        {cart.length > 0 ? (
          <div>
            <div className="flex items-center justify-between">
              <p className="uppercase font-bold tracking-wide text-[1.2em]">
                Cart ({cart.length})
              </p>
              <button
                className="tracking-wider text-darkGray"
                onClick={handleRemovingProducts}
              >
                Remove All
              </button>
            </div>

            {cart.map((product, i) => {
              const productData = data.products.find(
                (item) => item.name === product.name
              );

              return (
                <div className="mt-5" key={i}>
                  <div className="flex flex-row items-center sm:gap-5 justify-between">
                    <Image
                      src={
                        productData?.cartImage ||
                        "/assets/cart/image-xx59-headphones.jpg"
                      }
                      alt={product.name || "Product"}
                      width={70}
                      height={70}
                      className="rounded-lg"
                    />
                    <ProductAmount
                      id={product.productId}
                      name={product.name}
                      price={product.price}
                      addToCartBtn={false}
                      productAmount={product.amount}
                    />
                  </div>
                </div>
              );
            })}

            <div className="flex mt-[3em] items-center justify-between">
              <p className="uppercase text-darkGray">Total</p>
              <p className="font-semibold text-[1.1em]">
                {formatNumber(total)}
              </p>
            </div>
            <Link href={"/checkout"}>
              <Button
                className="bg-orange text-white uppercase font-bold w-full text-[1em] h-[45px] tracking-wide mt-[2em]"
                onClick={() => {
                  setOpenMenu(false);
                  setCartMenu(false);
                }}
              >
                Checkout
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-center font-semibold tracking-wide text-[20px]">
              Cart is empty!
            </p>
          </div>
        )}
      </div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
        onClick={() => {
          setOpenMenu(false);
          setCartMenu(false);
        }}
      ></div>
    </>
  );
};

export default CartList;
