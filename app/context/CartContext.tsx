"use client";

import { updateProductAmount } from "@/functions";
import { Product } from "@/index";
import { databases, Query } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

//The data below will be shared through all components
interface CartContextProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>; //the set cart setter function
  fetchCart: (userId: string) => Promise<void>; //async function
  incrementItem: (userId: string, productId: string) => Promise<void>;
  decrementItem: (userId: string, productId: string) => Promise<void>;
  total: number;
  setTotal: (val:number) => void;
  cartCount: number;
  productsCount: number;
  setProductsCount: (val: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { user, loading } = useUser();
  const [productsCount, setProductsCount] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);

  //calc the total whenever the cart is updated
  useEffect(() => {
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );
    setTotal(newTotal);
  }, [productsCount, cart]);

  useEffect(() => {
    const getProducts = async () => {
      if (loading === false) {
        if (!user?.id) {
          return;
        } else {
          await fetchCart(user?.id);
          console.log("cart is fetched");
        }
      }
    };
    getProducts();
  }, [loading]);


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


      if (carts.total > 0) {
        const cartItems = carts.documents[0].items.map((item: string) =>
          JSON.parse(item)
        );
        setCart(cartItems);
        const cartCount = cartItems.reduce(
          (total: any, product: any) => total + product.amount,
          0
        );
        setProductsCount(cartCount);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const incrementItem = async (userId: string, productId: string) => {
    try {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.productId === productId
            ? { ...item, amount: item.amount + 1 }
            : item
        );
  
        // Calculate the new cart count
        const cartCount = updatedCart.reduce(
          (total: number, product: any) => total + product.amount,
          0
        );
  
        // Update the number of products
        setProductsCount(cartCount);
  
        return updatedCart; // Return the updated cart
      });
      //update the cart amount on appwrite
      await updateProductAmount(userId, productId, true);
    } catch (error) {
      console.error("Error incrementing product amount:", error);
    }
  };

  const decrementItem = async (userId: string, productId: string) => {
    try {
      setCart((prevCart) => {
        const updatedCart = prevCart
          .map((item) =>
            item.productId === productId
              ? { ...item, amount: item.amount - 1 }
              : item
          )
          .filter((item) => item.amount > 0); // Remove items with amount <= 0
  
        // Calculate the new cart count
        const cartCount = updatedCart.reduce(
          (total: number, product: any) => total + product.amount,
          0
        );
  
        // Update the number of products
        setProductsCount(cartCount);
  
        return updatedCart; // Return the updated cart
      });
      await updateProductAmount(userId, productId, false);
    } catch (error) {
      console.error("Error decrementing product amount:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
        incrementItem,
        decrementItem,
        total,
        setTotal,
        cartCount,
        productsCount,
        setProductsCount,
      }}
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
