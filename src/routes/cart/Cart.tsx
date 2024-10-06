import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCartItem, addToCart } from "../../redux/slices/cartSlices";
import { RootState } from '../../redux/type';
const Cart = () => {

  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.selected);const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return ""; 

    if (currency === "UZS") {
        return (numericPrice * 12600).toLocaleString() + " UZS"; 
    }
    return "$" + numericPrice.toFixed(2);
};



  return (
    <div className="py-10 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Your Cart</h2>

        {cart.products.length === 0 ? (
          <div className="text-center text-gray-600">
            <h3 className="text-2xl">Your cart is empty</h3>
            <p className="mt-2">Start adding some products!</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {cart.products.map((product: any) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-between transition-transform transform hover:shadow-2xl"
              >
                <div className="flex items-center">
                  <img
                    src={product.image_link}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-700">
                          {formatPrice(product.price)} 
                    </p>
                    <p className="text-gray-500">Quantity: {product.quantity}</p>
                    <p className="font-bold mt-1">
                      Total: {formatPrice(product.price * product.quantity)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => dispatch(removeFromCart(product))}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => dispatch(clearCartItem(product))}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Add
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
