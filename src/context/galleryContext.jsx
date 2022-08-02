import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStrorage";

const fakeData = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1659270102126-97cc33f3f757?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    isLike: false,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1659350364879-91ffb79a2f54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    isLike: false,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1659269368191-dde25f0cf6fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60s",
    isLike: false,
  },
];

const GalleryContext = createContext();

function GalleryProvider(props) {
  const { storedValue, setValue } = useLocalStorage("photos", fakeData);
  const { storedValue: cartLists, setValue: setCartItem } = useLocalStorage(
    "cart",
    []
  );

  const [photos, setPhotos] = useState(storedValue);
  const [cartItems, setCartItems] = useState(cartLists);
  const [likeList, setLikeList] = useState([]);
  function toggleLikes(photoId) {
    const updateArr = photos.map((photo) => {
      if (photo.id === photoId) {
        return { ...photo, isLike: !photo.isLike };
      }
      return photo;
    });
    setPhotos(updateArr);
    setValue(updateArr);
  }

  function addToCart(newItem) {
    setCartItems((preItem) => {
      const isExits = preItem.some((item) => item.id === newItem.id);
      if (isExits) {
        setCartItem([...preItem]);
        return [...preItem];
      }
      setCartItem([...preItem, newItem]);

      return [...preItem, newItem];
    });
  }

  function removeItems(id) {
    setCartItems((prevItem) => {
      const result = prevItem.filter((item) => item.id !== id);
      setCartItem(result);
      return result;
    });
  }
  const value = {
    photos,
    cartItems,
    likeList,
    setLikeList,
    setCartItems,
    setPhotos,
    toggleLikes,
    addToCart,
    removeItems,
  };
  return (
    <GalleryContext.Provider value={value} {...props}></GalleryContext.Provider>
  );
}

function useGallery() {
  const context = useContext(GalleryContext);
  if (context === "undefided") throw new Error("Lỗi context");
  return context;
}

export { useGallery, GalleryProvider };
