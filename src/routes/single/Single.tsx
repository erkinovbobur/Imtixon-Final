import { useParams } from "react-router-dom";
import { useProductQuery } from "../../redux/api/usersApi"; 
import { Product } from "../../redux/type";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import { RootState } from '../../redux/type';
import { useState } from "react";

const Single = () => {
    const { productId } = useParams<{ productId: string }>();
    const { data: products, isLoading, error } = useProductQuery();
    const currency = useSelector((state: RootState) => state.currency.selected);
    const dispatch = useDispatch();

    const numericProductId = productId ? parseInt(productId) : null;
    const product = products?.find((p: Product) => p.id === numericProductId);

    const [selectedColor, setSelectedColor] = useState<string | null>(null); 

    const formatPrice = (price: string) => {
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) return "";

        if (currency === "UZS") {
            return (numericPrice * 12600).toLocaleString() + " UZS";
        }
        return "$" + numericPrice.toFixed(2);
    };

    const handleAddToCart = () => {
        if (selectedColor) {
            const cartItem = {
                ...product,
                selectedColor, 
            };
            dispatch(addToCart(cartItem)); 
        } else {
            alert("Iltimos, rangni tanlang!"); 
        }
    };

    if (isLoading) {
        return <p>Mahsulot yuklanmoqda...</p>;
    }

    if (error) {
        return <p>Mahsulotlarni olishda xatolik yuz berdi.</p>;
    }

    if (!product) {
        return <p>Mahsulot topilmadi</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
                <img
                    src={product.image_link}
                    alt={product.name}
                    className="w-full md:w-1/2 h-80 object-cover rounded-lg"
                />
                <div className="md:ml-8">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-pink-600 text-2xl font-bold mb-4">
                        {formatPrice(product.price)}
                    </p>
                    <div className="flex flex-wrap space-x-2 mt-2">
                        {product.product_colors?.slice(0, 6).map((color: { hex_value: string; colour_name: string }, index: number) => (
                            <div
                                key={index}
                                className={`w-6 h-6 rounded-full border mb-2 cursor-pointer ${selectedColor === color.hex_value ? 'ring-2 ring-blue-500' : ''}`}
                                style={{ backgroundColor: color.hex_value || '#ccc' }}
                                title={color.colour_name || 'Unknown'}
                                onClick={() => setSelectedColor(color.hex_value)} 
                            ></div>
                        ))}
                    </div>
                    <p className="text-gray-700 mb-4">Kategoriya: {product.category}</p>
                    <button
                        onClick={handleAddToCart} 
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Savatchaga qo‘shish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Single;
