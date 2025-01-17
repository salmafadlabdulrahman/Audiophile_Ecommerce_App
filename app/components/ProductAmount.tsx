"use client";
import { Button } from "@/components/ui/button";
import { databases, Query } from "@/lib/appwrite";
import { useState } from "react";
import { useUser } from "../context/UserContext";

interface ProductAmountProps {
  id: string;
  name: string;
  price: number;
}

const ProductAmount = ({ id, name, price }: ProductAmountProps) => {
  const [amount, setAmount] = useState(1);
  const { user } = useUser();
  const userId = user?.id;


  const addToCart = async (
    userId: string,
    product: { id: string; name: string; price: number },
    amount: number
  ) => {
    try {
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
      const cartsCollectionId = process.env
        .NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID as string;

      //check if the user already has a cart
      const carts = await databases.listDocuments(
        databaseId,
        cartsCollectionId,
        [Query.equal("userId", userId)]
      );
      let cart;
      if (carts.total > 0) {
        cart = carts.documents[0];
      } else {
        //create a new document if it doesn't exist
        cart = await databases.createDocument(
          databaseId,
          cartsCollectionId,
          "unique()",
          {
            userId,
            items: [],
            total: 0,
          }
        );
      }

      //update the cart with the current item being added
      const curItemIndex = cart.items.findIndex((curItem: any) => {
        const parsedItem = JSON.parse(curItem);
        return parsedItem.productId === product.id;
        //curItem.productId === product.id
      });

      if (curItemIndex > -1) {
        //if the product is already in the cart update the amount
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

      //recalculate the total
      const total = cart.items.reduce((sum: number, item: any) => {
        const parsedItem = JSON.parse(item);
        return sum + parsedItem.price * parsedItem.amount;
      }, 0);

      //update the cart doc
      await databases.updateDocument(databaseId, cartsCollectionId, cart.$id, {
        items: cart.items,
        total,
      });

      console.log("Cart updated successfully");
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleCart = async () => {
    try {
      if (!userId) {
        console.log("user is not logged in");
        return;
      } else {
        await addToCart(userId, { id, name, price }, amount);
        console.log("Product added to the cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const increment = () => setAmount((prev) => prev + 1);
  const decrement = () => setAmount((prev) => Math.max(1, prev - 1));
  return (
    <div className="flex items-center gap-6 xs:mt-[1.5em] sm:mt-0">
      <div className="bg-gray flex items-center justify-between w-[110px] h-[40px]">
        <button
          className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]"
          onClick={() => decrement()}
        >
          -
        </button>
        <p className="font-bold">{amount}</p>
        <button
          className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]"
          onClick={() => increment()}
        >
          +
        </button>
      </div>

      <Button
        className="uppercase font-semibold tracking-wider h-[40px]"
        onClick={() => handleCart()}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductAmount;
