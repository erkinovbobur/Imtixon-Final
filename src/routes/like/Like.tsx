import { useDispatch, useSelector } from "react-redux";
import { unlikeProduct } from "../../redux/slices/LikeSlices"; 
import { useProductQuery } from "../../redux/api/usersApi";

const Like = () => {
  const dispatch = useDispatch();
  const likedProducts = useSelector((state: any) => state.like?.likedProducts || []);
  const { data: allProducts } = useProductQuery();
  const likedProductDetails = allProducts?.filter(product => likedProducts.includes(product.id));

  const handleDelete = (productId: number) => {
    dispatch(unlikeProduct(productId)); 
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl text-center font-bold mb-8 text-white">Liked Products</h2>
      {likedProductDetails && likedProductDetails.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedProductDetails.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:-translate-y-1 hover:shadow-xl"
            >
              <img 
                src={product.image_link} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded-t-lg mb-4" 
              />
              <div className="flex flex-col justify-between">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-pink-600 font-bold mb-2">${product.price}</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleDelete(product.id)} 
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No liked products found.</p>
      )}
    </div>
  );
};

export default Like;
