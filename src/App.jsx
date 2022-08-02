import { Fragment } from "react";
import "./App.css";
import CartList from "./component/gallery/CartList";
import PhotoList from "./component/gallery/PhotoList";
import { GalleryProvider } from "./context/galleryContext";

function App() {
  return (
    <Fragment>
      <GalleryProvider>
        <PhotoList></PhotoList>
        <CartList></CartList>
      </GalleryProvider>
    </Fragment>
  );
}

export default App;
