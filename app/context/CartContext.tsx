"use client";

import { calcTotal, updateProductAmount } from "@/functions";
import { Product } from "@/index";
import { databases, Query } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";

//The data below will be shared through all components
interface CartContextProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>; //the set cart setter function
  fetchCart: (userId: string) => Promise<void>; //async function
  incrementItem: (userId: string, productId: string) => Promise<void>;
  decrementItem: (userId: string, productId: string) => Promise<void>;
  total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  //calc the total whenever the cart is updated
  useEffect(() => {
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  //Fetch cart
  const fetchCart = async (userId: string) => {
    try {
      const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
      const cartsCollectionId = process.env
        .NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID as string;

      const carts = await databases.listDocuments(
        databaseId,
        cartsCollectionId,
        [Query.equal("userId", userId)]
      );

      let cart;

      if (carts.total > 0) {
        cart = carts.documents[0];
        const parsedCart = cart.items.map((item: string) => JSON.parse(item));
        setCart(parsedCart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const incrementItem = async (userId: string, productId: string) => {
    try {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      );
      await updateProductAmount(userId, productId, true);
    } catch (error) {
      console.error("Error incrementing product amount:", error);
    }
  };

  const decrementItem = async (userId: string, productId: string) => {
    try {
      setCart(
        (prevCart) =>
          prevCart
            .map((item) =>
              item.productId === productId
                ? { ...item, amount: item.amount - 1 }
                : item
            )
            .filter((item) => item.amount > 0)
      );

      await updateProductAmount(userId, productId, false);
    } catch (error) {
      console.error("Error decrementing product amount:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, fetchCart, incrementItem, decrementItem, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartProvider;
