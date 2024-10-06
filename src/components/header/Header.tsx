import { FaCartPlus } from "react-icons/fa"; 
import { FcLike } from "react-icons/fc"; 
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../../redux/slices/currnsySlice";
import React from 'react';
import { Link } from 'react-router-dom';
import beauty from "../../assets/beauty.png";
import { RootState } from "../../redux/type";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.products.length);
  const like = useSelector((state: RootState) => state.like.likedProducts.length);
  const currency = useSelector((state: RootState) => state.currency.selected);
  return (
    <div>
      <div className="bg-black text-white text-center py-2">
        <h1 className="text-sm">
          70€ sarf qilganda tanlangan buyumlarda 15% chegirma oling: <span className="font-bold">YAY</span>
        </h1>
      </div>

      <div className="bg-gray-100 text-black text-center py-2 border-b flex items-center justify-center gap-[200px]">
        <h2 className="font-bold text-lg mb-1">
          50€ sarf qilganda BAHO SIZGA BEPUL Liquid Cream Blush 
        </h2>
        <p className="mb-2">
          Maxsus takliflar va chegirmalar uchun ilovani yuklab oling
        </p>
        <div className="flex space-x-4">
        

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
            />
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
           <FaCartPlus className="text-3xl" />
              <span>{ cart }</span>
            </Link>
            <Link to="/like" className="relative">
              <FcLike className="text-3xl" />
              <span>{ like }</span>
            </Link>
           </div>
          </div>
        <div className="flex item-center juctify-center">
          <h1>Leon</h1>
          </div>
      </header>
    </div>
    
  );
};

export default Header;
