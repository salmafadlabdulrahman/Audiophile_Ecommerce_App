import {
  Product,
} from "./index";
import { databases, Query } from "./lib/appwrite";

export const calcTotal = (cart: Product[]) => {
  const total = cart.reduce((sum: number, item: any) => {
    const parsedItem = JSON.parse(item);
    return sum + parsedItem.price * parsedItem.amount;
  }, 0);
  return total;
};


const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const cartsCollectionId = process.env
  .NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID as string;

export const updateProductAmount = async (
  userId: string,
  productId: string,
  increment: boolean
) => {
  try {
    const carts = await databases.listDocuments(databaseId, cartsCollectionId, [
      Query.equal("userId", userId),
    ]);

    if (carts.total > 0) {
      const cart = carts.documents[0];
      const updatedItems = cart.items.map((item: string) => {
        const parsedItem = JSON.parse(item);
        if (parsedItem.productId === productId) {
          parsedItem.amount += increment ? 1 : -1;
        }
        return JSON.stringify(parsedItem);
      });

      await databases.updateDocument(databaseId, cartsCollectionId, cart.$id, {
        items: updatedItems.filter((item: string) => {
          const parsedItem = JSON.parse(item);
          return parsedItem.amount > 0;
        }),
      });
    }
  } catch (error) {
    console.error("Error updating product amount in Appwrite:", error);
  }
};

export const checkUserCart = async (userId: string) => {
  try {
    const carts = await databases.listDocuments(databaseId, cartsCollectionId, [
      Query.equal("userId", userId),
    ]);

    let cart;
    if (carts.total > 0) {
      cart = carts.documents[0];
    } else {
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
    return cart;
  } catch (error) {
    console.log("checking for cart failed");
  }
};


export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};


export const removeAllProducts = async () => {
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
    //setProductsCount(0);
    //setCart([]);
    console.log("All items have been removed");
  } catch (error) {
    console.log("deleteing items failed", error);
  }
};