const Body = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
        <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img
            src="https://images.ctfassets.net/eoaaqxyywn6o/7hNkaoJiA32SZR3jEc8lc/2333d7cdbd2c495e3f42b84549365fb9/TT_LIPSTORY.gif"
            alt="Lip Product"
            className="w-full h-48 object-contain rounded-t-lg" 
          />
          <h1 className="text-xl font-bold mt-2">The viral lip you've been waiting for</h1>
          <p className="text-gray-600 mt-1">Say hello to the all-day staying power of a lip stain with Wonderskin.</p>
          <button className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">
            Shop Now
          </button>
        </div>
  
        <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <img
            src="https://images.ctfassets.net/eoaaqxyywn6o/4beh2XCXNyiu5GIMWQ0p6y/8e1b1c779564cc5d2feafb78fc351bb7/Trading_Trio_ROW-NO_DR_JART.jpg"
            alt="Body Care Product"
            className="w-full h-48 object-contain rounded-t-lg" 
          />
          <h1 className="text-xl font-bold mt-2">Head to toe glow</h1>
          <p className="text-gray-600 mt-1">
            Make way for clearer, calmer skin with body care newbies from Acnemey, The Ordinary, and more.
          </p>
          <button className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">
            Shop Now
          </button>
        </div>
      </div>
    );
  };
  
  export default Body;
  
  