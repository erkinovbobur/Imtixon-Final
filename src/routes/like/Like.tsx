import { useDispatch } from "react-redux";
import { unlikeProduct } from "../../redux/slices/LikeSlices"; 
import { useProductQuery } from "../../redux/api/usersApi";
import { useSelector } from "react-redux";

const Like = () => {
  const dispatch = useDispatch();
  const likedProducts = useSelector((state: any) => state.like?.likedProducts || []); 
  const { data: allProducts } = useProductQuery();
  const likedProductDetails = allProducts?.filter(product => likedProducts.includes(product.id));

  const handleDelete = (productId: number) => {
    dispatch(unlikeProduct(productId)); 
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-bold mb-8">Liked Products</h2>
      {likedProductDetails && likedProductDetails.length > 0 ? (
        likedProductDetails.map((product) => (
          <div key={product.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-pink-600 font-bold">${product.price}</p>
            <img src={product.image_link} alt={product.name} className="w-20 h-20 object-cover" />
            <div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                onClick={() => handleDelete(product.id)} 
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No liked products found.</p>
      )}
    </div>
  );
};

export default Like;
