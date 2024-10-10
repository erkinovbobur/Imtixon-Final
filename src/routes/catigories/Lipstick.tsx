import { useLipstickQuery } from "../../redux/api/usersApi";
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; 
import { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlices'; 
import { likeProduct, unlikeProduct } from '../../redux/slices/LikeSlices'; 
import { Product, RootState } from '../../redux/type'; 

const Lipstick = () => {
  const { data, isLoading, isError } = useLipstickQuery();
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null); 
  const dispatch = useDispatch(); 
  const likedProducts = useSelector((state: RootState) => state.like.likedProducts); 

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product)); 
  };

  const handleLikeToggle = (productId: number) => {
    if (likedProducts.includes(productId)) {
      dispatch(unlikeProduct(productId));
    } else {
      dispatch(likeProduct(productId)); 
    }
  };

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
        <p className="text-red-500 text-xl">Lipstick data fetching error. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Lipstick Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.slice(95).map((product: Product, index: number) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full transition-transform transform hover:-translate-y-1 hover:shadow-xl relative"
          >
            <img
              src={product.image_link}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            {/* Like ikonasi */}
            <div className="absolute top-3 right-4 p-[15px]">
              <div className="relative">
                {tooltipIndex === index && ( // Tooltip faqat bitta mahsulotda ko'rsatiladi
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 mb-1">
                    Like
                  </span>
                )}
                <button
                  className={`flex items-center transition ${likedProducts.includes(product.id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  onMouseEnter={() => setTooltipIndex(index)}
                  onMouseLeave={() => setTooltipIndex(null)}
                  onClick={() => handleLikeToggle(product.id)} // Like funksiyasini chaqirish
                >
                  <FaHeart className="mr-2" />
                </button>
              </div>
            </div>

            <div className="flex-grow p-4 flex flex-col justify-between">
              <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <p className="text-sm font-semibold text-gray-800">£{product.price}</p>

              <div className="flex flex-wrap space-x-2 mt-2">
                {product.product_colors?.slice(0, 6).map((color, index: number) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border border-gray-300 mb-2"
                    style={{ backgroundColor: color.hex_value }}
                    title={color.colour_name}
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

export default Lipstick;
