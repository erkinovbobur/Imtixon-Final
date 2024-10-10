import Home from "./routes/home/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./routes/cart/Cart";
import Like from "./routes/like/Like";
import Header from "./components/header/Header";
import Lipstick from "./routes/catigories/Lipstick";
import Foundation from "./routes/catigories/Foundation"
import Eyeliner from "./routes/catigories/Eyeliner"
import Mascara from "./routes/catigories/Mascara"
import Blush from "./routes/catigories/Blush"
import Bronzer from "./routes/catigories/Bronzer"
import Single from "./routes/single/Single"
import Body from "./components/body/Body";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/like" element={<Like />} />
        <Route path="/Body" element={<Body />} /> 
        <Route path="*" element={<Home />} />
        <Route path="/details/:productId" element={<Single />} />
        <Route path="/Single" element={<Single />}/>
        <Route path="/Lipstick" element={<Lipstick />} />
        <Route path="/Foundation" element={<Foundation />} />
        <Route path="/Eyeliner" element={<Eyeliner />} />
        <Route path="/Mascara" element={<Mascara />} />
        <Route path="/Blush" element={<Blush />} />
        <Route path="/Bronzer" element={<Bronzer />} />
       </Routes>
    </>
  );
}

export default App;
