import Home from "./routes/home/Home"
import { Route, Routes } from "react-router-dom"
import Cart from "./routes/cart/Cart"
import Like from "./routes/like/Like"
import Deatels from "./routes/details/Deatels"
import Header from "./components/header/Header"
function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/like" element={<Like />} />
        <Route path='/deatels/:id' element={<Deatels />} />
        <Route path="*" element={<Home />} />
         
      </Routes>
        
    </>
  )
}

export default App
