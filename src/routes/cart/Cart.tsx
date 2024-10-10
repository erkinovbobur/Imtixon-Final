import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCartItem, addToCart } from "../../redux/slices/cartSlices";
import { RootState } from '../../redux/type';

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.selected);

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return ""; 

    if (currency === "UZS") {
        return (numericPrice * 12600).toLocaleString() + " UZS"; 
    }
    return "$" + numericPrice.toFixed(2);
  };

  return (
    <div className="py-10 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Cart</h2>

        {cart.products.length === 0 ? (
          <div className="text-center text-gray-600">
            <h3 className="text-3xl font-semibold">Your cart is empty</h3>
            <p className="mt-4 text-lg">Start adding some products to see them here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.products.map((product: any) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={product.image_link}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg mr-6"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-700 mt-1">{formatPrice(product.price)}</p>
                    <p className="text-gray-500 mt-1">Quantity: {product.quantity}</p>
                    {product.selectedColor && (
                      <div className="flex items-center mt-2">
                        <div
                          className="w-6 h-6 rounded-full border mr-2"
                          style={{ backgroundColor: product.selectedColor }}
                        ></div>
                    
                      </div>
                    )}
                    <p className="font-bold text-gray-800 mt-1">
                      Total: {formatPrice(product.price * product.quantity)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-transform duration-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(product))}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-transform duration-200"
                    >
                      -
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(clearCartItem(product))}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-transform duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
