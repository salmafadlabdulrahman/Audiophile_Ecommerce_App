"use client";

import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { ProductAmountProps } from "@/index";

const ProductAmount = ({
  id
}: ProductAmountProps) => {
  const { user } = useUser();
  const { incrementItem, decrementItem, cart } = useCart();
  const currentProduct = cart.find((item) => item.productId === id);
  const amount = currentProduct ? currentProduct.amount : 1;

  return (
    <div className="flex items-center gap-6 xs:mt-[1.5em] sm:mt-0">
      <div className="bg-gray flex items-center justify-between w-[110px] h-[40px]">
        <button
          className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]"
          onClick={() => {
            if (!user?.id) {
              return;
            }
            decrementItem(user.id, id);
          }}
        >
          -
        </button>
        <p className="font-bold">{amount}</p>
        <button
          className="hover:text-orange w-[50px] h-full hover:bg-[#a7a7a7]"
          onClick={() => {
            if (!user?.id) {
              return;
            }
            incrementItem(user.id, id);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductAmount;
