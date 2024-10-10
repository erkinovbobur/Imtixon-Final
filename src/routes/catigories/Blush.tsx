import { CgDollar } from "react-icons/cg";
import { useBlushQuery } from "../../redux/api/usersApi";
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Font Awesome ikonkalari
import { useState } from 'react'; // State uchun
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlices'; // Korzinaga qo'shish funksiyasi
import { likeProduct, unlikeProduct } from '../../redux/slices/LikeSlices'; // Like va unlike funksiyalari
import { Product } from '../../redux/type'; // Import yo'lini kerakli tarzda o'zgartiring

const Blush = () => {
  const { data, isLoading, isError } = useBlushQuery();
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const dispatch = useDispatch();

  const likedProducts = useSelector((state: any) => state.like.likedProducts); // Like holatini olish

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product)); // Mahsulotni korzinaga qo'shish
  };

  const handleLikeProduct = (productId: number) => {
      if (likedProducts.includes(productId)) {
          dispatch(unlikeProduct(productId)); // Agar mahsulot yoqilgan bo'lsa, unlike qiling
      } else {
          dispatch(likeProduct(productId)); // Aks holda, like qiling
      }
  };

  const isProductLiked = (productId: number) => likedProducts.includes(productId); // Mahsulot likedmi?

  // Loading va Error holatlarini tekshirish
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (isError) return <div className="text-center text-red-500">Error fetching blush data</div>;

  // Data yo'q bo'lsa, bo'sh joy ko'rsatish
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">No products available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Blush Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.slice(45).map((product: Product, index: number) => (
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
            <div className="absolute top-3 right-3 p-[15px]">
              <div className="relative">
                {tooltipIndex === index && (
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 mb-1">
                    Like
                  </span>
                )}
                <button
                  className={`flex items-center transition ${isProductLiked(product.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
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

export default Blush;
