import { CgDollar } from "react-icons/cg"; 
import { useBlushQuery } from "../../redux/api/usersApi";

const Blush = () => {
  const { data } = useBlushQuery();

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mb-8 text-white">Blush Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full"
          >
            <img
              src={product.image_link}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="flex-grow p-4 flex flex-col justify-between">
              <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.brand}</p>
              <p className="text-sm font-semibold text-gray-800"><CgDollar />{product.price}</p>
              <div className="flex justify-between items-center mt-4">
                <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Add to Bag
                </button>
                <button className="text-gray-500 hover:text-red-500 transition">
                  <i className="far fa-heart"></i> 
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

