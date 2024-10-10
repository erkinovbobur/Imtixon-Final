import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BiCartAdd } from "react-icons/bi";
import { useProductQuery } from "../../redux/api/usersApi";
import { Product } from "../../redux/type";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import { likeProduct, unlikeProduct } from "../../redux/slices/LikeSlices";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/type';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const Products = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useProductQuery();
    const dispatch = useDispatch();
    const currency = useSelector((state: RootState) => state.currency.selected);
    const likedProducts = useSelector((state: RootState) => state.like.likedProducts);
    const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

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

    const formatPrice = (price: string) => {
        const numericPrice = parseFloat(price); 
        if (isNaN(numericPrice)) return ""; 

        if (currency === "UZS") {
            return (numericPrice * 12600).toLocaleString() + " UZS"; 
        }
        return "$" + numericPrice.toFixed(2);
    };

    const handleViewDetails = (productId: number) => {
        navigate(`/details/${productId}`);
    };

    if (isLoading) return <p>Mahsulotlar yuklanmoqda...</p>;
    if (error) return <p>Mahsulotlarni olishda xatolik</p>;

    return (
        <div className="py-10 bg-gray-100">
            <h2 className="text-4xl text-center font-bold mb-12 text-gray-800">Popular Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
                {data?.slice(133, 137).map((product: Product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105 duration-300"
                    >
                        <div className="relative h-[300px]">
                            <img
                                src={product.image_link}
                                alt={product.name}
                                className="w-full h-full object-contain" // o'zgartirish
                            />
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-gray-500 mb-2 uppercase text-sm">{product.category}</p>
                            <p className="text-pink-500 font-bold text-xl mb-4">
                                {formatPrice(product.price)} 
                            </p>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                            <Link to={`/details/${product.id}`}>
    <button 
        className="text-blue-600 underline text-sm hover:text-blue-800 transition-colors duration-200"
        onClick={() => handleViewDetails(product.id)} // o'zgartirish
    >
        Mahsulotni ko‘rish
    </button>
</Link>


                            <div className="absolute top-3 right-3 p-[15px]">
                                <div className="relative">
                                    {tooltipIndex === product.id && (
                                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 mb-1">
                                            Like
                                        </span>
                                    )}
                                    <button
                                        className={`flex items-center transition ${likedProducts.includes(product.id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                                        onMouseEnter={() => setTooltipIndex(product.id)}
                                        onMouseLeave={() => setTooltipIndex(null)}
                                        onClick={() => handleLikeToggle(product.id)}
                                    >
                                        {likedProducts.includes(product.id) ? <FcLike /> : <AiOutlineHeart />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
                                >
                                    <BiCartAdd className="mr-2 text-xl" />
                                    Savatchaga qo‘shish
                                </button>
                            </div>
                        </div>
                       </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
