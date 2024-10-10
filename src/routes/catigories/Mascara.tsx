import { CgDollar } from "react-icons/cg";
import { useMascaraQuery } from "../../redux/api/usersApi";
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; 
import { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlices'; 
import { likeProduct, unlikeProduct } from '../../redux/slices/LikeSlices'; 
import { Product } from '../../redux/type'; 

const Mascara = () => {
  const { data, isLoading, isError } = useMascaraQuery();
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const dispatch = useDispatch();

  const likedProducts = useSelector((state: any) => state.like.likedProducts); 

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product)); 
  };

  const handleLikeProduct = (productId: number) => {
      if (likedProducts.includes(productId)) {
          dispatch(unlikeProduct(productId)); 
      } else {
          dispatch(likeProduct(productId)); 
      }
  };

  const isProductLiked = (productId: number) => likedProducts.includes(productId); 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">Error fetching mascara data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Mascara Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.slice(50).map((product: Product, index: number) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full transition-transform transform hover:-translate-y-1 hover:shadow-xl relative"
          >
            <img
              src={product.image_link}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />

           
            <div className="absolute top-3 right-3 p-[15px]">
              <div className="relative">
                {tooltipIndex === index && (
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 mb-1">
                    Like
                  </span>
                )}
                <button
                  className={`flex items-center transition ${isProductLiked(product.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`} // Rangni o'zgartirish
                  onMouseEnter={() => setTooltipIndex(index)}
                  onMouseLeave={() => setTooltipIndex(null)}
                  onClick={() => handleLikeProduct(product.id)} 
                >
                  <FaHeart className="mr-2" />
                </button>
              </div>
            </div>

            <div className="flex-grow p-4 flex flex-col justify-between">
              <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <p className="text-sm font-semibold text-gray-800 flex items-center">
                <CgDollar className="mr-1" />
                {product.price}
              </p>

              {/* Ranglar */}
              <div className="flex flex-wrap space-x-2 mt-2">
                {product.product_colors?.slice(0, 6).map((color: { hex_value: string; colour_name: string }, index: number) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border border-gray-300 mb-2"
                    style={{ backgroundColor: color.hex_value || '#ccc' }} 
                    title={color.colour_name || 'Unknown'} 
                  ></div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  className="flex items-center bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => handleAddToCart(product)} 
                >
                  <FaShoppingCart className="mr-2" /> Korzinkaga joylash
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mascara;
