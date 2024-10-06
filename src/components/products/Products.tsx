import { FcLike } from "react-icons/fc";
import { BiCartAdd } from "react-icons/bi";
import { useProductQuery } from "../../redux/api/usersApi";
import { Product } from "../../redux/type";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import { likeProduct } from "../../redux/slices/LikeSlices";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/type';
import { useNavigate } from "react-router-dom";
const Products = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useProductQuery();
    const dispatch = useDispatch();
    const currency = useSelector((state: RootState) => state.currency.selected);

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    };

    const handleLikeProduct = (product: Product) => {
        dispatch(likeProduct(product.id));
    };

    const formatPrice = (price: string) => {
        const numericPrice = parseFloat(price); 
        if (isNaN(numericPrice)) return ""; 

        if (currency === "UZS") {
            return (numericPrice * 12600).toLocaleString() + " UZS"; 
        }
        return "$" + numericPrice.toFixed(2);
    };
    const handleViewDetails =  ( productId: Product) => {
        navigate(`/details/${productId}`);
        
    }
    

    if (isLoading) return <p>Mahsulotlar yuklanmoqda...</p>;
    if (error) return <p>Mahsulotlarni olishda xatolik</p>;

    return (
        <div className="py-10 bg-gray-100">
            <h2 className="text-3xl text-center font-bold mb-8">Ommabop mahsulotlar</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                {data?.slice(130, 134).map((product: Product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                    >
                        <div className="relative h-[350px] bg-gray-200">
                            <img
                                src={product.image_link}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2">{product.category}</p>
                            <p className="text-pink-600 font-bold text-lg mb-4">
                                {formatPrice(product.price)} 
                            </p>
                            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>

                            <button onClick={ () => handleViewDetails(product) }
                                className="text-blue-500 underline text-sm mb-4 inline-block hover:text-blue-600 cursor-pointer"
                                rel="noopener noreferrer"
                            >
                                Mahsulotni ko‘rish
                            </button>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    <BiCartAdd className="mr-2 text-2xl" />
                                    Savatchaga qo‘shish
                                </button>

                                <button
                                    onClick={() => handleLikeProduct(product)}
                                    className="text-2xl"
                                >
                                    <FcLike />
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <span className="text-yellow-400">⭐ {product.rating}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
