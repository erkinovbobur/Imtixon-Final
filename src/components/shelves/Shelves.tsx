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

const Shelves = () => {
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

    const renderStars = (rating: number | null) => {
        const stars = [];
        const starRating = rating !== null ? rating : 0; // rating null bo'lsa, 0 sifatida qabul qilinadi
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={`text-lg ${i < starRating ? "text-yellow-500" : "text-gray-400"}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    if (isLoading) return <p className="text-center text-lg">Mahsulotlar yuklanmoqda...</p>;
    if (error) return <p className="text-center text-lg">Mahsulotlarni olishda xatolik</p>;
    return (
        <div className="py-10 bg-gray-200">
            <h2 className="text-4xl text-center font-bold mb-12 text-gray-800">Flying off the shelves</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                {data?.slice(135, 139).map((product: Product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 hover:shadow-2xl"
                    >
                        <div className="relative">
                            <img
                                src={product.image_link}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <button
                                    className={`flex items-center text-xl transition duration-200 ${
                                        likedProducts.includes(product.id) ? 'text-red-500' : 'text-gray-500'
                                    }`}
                                    onMouseEnter={() => setTooltipIndex(product.id)}
                                    onMouseLeave={() => setTooltipIndex(null)}
                                    onClick={() => handleLikeToggle(product.id)}
                                >
                                    {likedProducts.includes(product.id) ? <FcLike /> : <AiOutlineHeart />}
                                    {tooltipIndex === product.id && (
                                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2">
                                            Like
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-gray-500 mb-2 uppercase text-xs">{product.category}</p>
                            <p className="text-pink-500 font-bold text-xl mb-4">
                                {formatPrice(product.price)}
                            </p>

                            {/* Reyting yulduzlarini ko'rsatish */}
                            <div className="mb-4">
                                {renderStars(product.rating)} {/* Reyting ko'rsatish */}
                            </div>

                            <Link to={`/details/${product.id}`}>
                                <button 
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                                    onClick={() => handleViewDetails(product.id)}
                                >
                                    Mahsulotni ko‘rish
                                </button>
                            </Link>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition duration-300"
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

export default Shelves;
