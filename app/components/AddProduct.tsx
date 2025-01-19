"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { ProductPageProps } from "@/index";
import { databases } from "@/lib/appwrite";
import { calcTotal, checkUserCart } from "@/functions";
import { useCart } from "../context/CartContext";

const AddProduct = ({ id, name, price }: ProductPageProps) => {
  const { user } = useUser();
  const { setCart, setProductsCount } = useCart();
  const [amount, setAmount] = useState(1);

  const addToCart = async (product: ProductPageProps, amount: number) => {
    try {
      if (!user?.id) {
        console.log("The user doesn't exist");
        return;
      }

      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
      const cartsCollectionId = process.env
        .NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID as string;

      //1. check if the user has a cart, if not create one:
      let cart = await checkUserCart(user?.id);

      //2. parse each product in the items array
      if (cart) {
        const curItemIndex = cart.items.findIndex((curItem: any) => {
          const parsedItem = JSON.parse(curItem);
          return parsedItem.productId === product.id;
        });

        //3.check if the current product is in the cart update the amount, if not add it.

        if (curItemIndex > -1) {
          const parsedItem = JSON.parse(cart.items[curItemIndex]);
          parsedItem.amount += amount;
          cart.items[curItemIndex] = JSON.stringify(parsedItem);
        } else {
          cart.items.push(
            JSON.stringify({
              productId: product.id,
              name: product.name,
              amount,
              price: product.price,
            })
          );
        }

        setCart((prevCart) => {
          // Create a new cart array
          const updatedCart = [...prevCart];

          // Check if the item already exists in the cart
          const existingItemIndex = updatedCart.findIndex(
            (item) => item.productId === product.id
          );

          if (existingItemIndex > -1) {
            // If it exists, update the amount
            updatedCart[existingItemIndex].amount += amount;
          } else {
            // If it doesn't exist, add the new item
            updatedCart.push({
              productId: product.id,
              name: product.name,
              amount,
              price: product.price,
            });
          }

          // Calculate the new cart count
          const cartCount = updatedCart.reduce(
            (total: number, item: any) => total + item.amount,
            0
          );

          // Update the number of products
          setProductsCount(cartCount);

          return updatedCart; // Return the updated cart
        });

        //4. recalculate the total
        let total = calcTotal(cart.items);

        //5. update the cart document
        await databases.updateDocument(
          databaseId,
          cartsCollectionId,
          cart.$id,
          {
            items: cart.items,
            total,
          }
        );
      }
      console.log("Cart updated successfully");
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  };

  return (
    <div className="flex items-center gap-6 xs:mt-[1.5em] sm:mt-0">
      <div className="bg-gray flex items-center justify-between w-[110px] h-[40px]">
        <button
          className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]"
          onClick={() => {
            setAmount((prev) => Math.max(1, prev - 1));
          }}
        >
          -
        </button>
        <p className="font-bold">{amount}</p>
        <button
          className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]"
          onClick={() => {
            setAmount((prev) => prev + 1);
          }}
        >
          +
        </button>
      </div>

      <Button
        className="uppercase font-semibold tracking-wider h-[40px]"
        onClick={() => {
          if (!user?.id) {
            return;
          }
          addToCart({ id, name, price }, amount);
        }}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default AddProduct;
