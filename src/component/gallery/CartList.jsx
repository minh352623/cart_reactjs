import React from "react";
import { useGallery } from "../../context/galleryContext";

const CartList = () => {
  const { cartItems, removeItems } = useGallery();
  //   console.log(cartItems);
  return (
    <div className="py-10 px-5 flex flex-col gap-3">
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-center items-center gap-3">
            <img src={item.url} alt="" className="w-10 h-10 rounded-full" />
            <button
              onClick={() => removeItems(item.id)}
              className="px-5 py-3 bg-red-400 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default CartList;
