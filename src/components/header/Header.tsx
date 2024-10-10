import { FaCartPlus } from "react-icons/fa"; 
import { FcLike } from "react-icons/fc"; 
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../redux/slices/currnsySlice";
import React, { useState } from 'react'; // useState ni import qilish
import { Link } from 'react-router-dom';
import beauty from "../../assets/beauty.png";
import { RootState } from "../../redux/type";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.products.length);
  const like = useSelector((state: RootState) => state.like.likedProducts.length);
  const currency = useSelector((state: RootState) => state.currency.selected);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div className="bg-black text-white text-center py-2">
        <h1 className="text-sm">
          Get 15% off selected when you spend £60 with code: SAVINGS (Excludes sale items) <span className="font-bold">YAY</span>
        </h1>
      </div>

      <div className="bg-gray-100 text-black text-center py-4 border-b flex items-center justify-around">
        <h2 className="font-bold text-lg mb-1">
          Haul up to 50% off By BEAUTY BAY palettes and sets RN!
        </h2>
        <p className="mb-2">
          Download the app for up to 20% off and exclusive offers! FREE delivery over £25 OR spend £60 for FREE next day delivery
        </p>
        <div className="flex justify-center space-x-4">
          <select value={currency} onChange={(e) => dispatch(setCurrency(e.target.value))} className="border border-gray-300 p-2 rounded-md w-[100px] focus:outline-none focus:ring focus:ring-black">
            <option value="USD">USD</option>
            <option value="UZS">UZS</option>
          </select>
        </div>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/"> 
              <img src={beauty} alt="Beauty Bay" className="w-[150px] h-auto" />
            </Link>
          </div>

          <div className="flex-grow mx-4">
            <input
              type="text"
              placeholder="Mahsulotlar, brendlarni qidirish"
              className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-black focus:ring focus:ring-black"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative hover:text-red-500 transition-colors duration-200">
              <FaCartPlus className="text-3xl" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{ cart }</span>
            </Link>
            <Link to="/like" className="relative hover:text-red-500 transition-colors duration-200">
              <FcLike className="text-3xl" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{ like }</span>
            </Link>
          </div>
        </div>

        <nav className="bg-gray-200 py-2">
          <div className="container mx-auto flex space-x-4 justify-around">
            <Link to="/Lipstick" className="hover:text-red-500 transition duration-300">Lipstick</Link>
            <Link to="/Foundation" className="hover:text-red-500 transition duration-300">Foundation</Link>
            <Link to="/Eyeliner" className="hover:text-red-500 transition duration-300">Eyeliner</Link>
            <Link to="/Mascara" className="hover:text-red-500 transition duration-300">Mascara</Link>
            <Link to="/Blush" className="hover:text-red-500 transition duration-300">Blush</Link>
            <Link to="/Bronzer" className="hover:text-red-500 transition duration-300">Bronzer</Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
