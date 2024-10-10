import imgss from "../../assets/reklam.jpg"; 
import { FiArrowRight } from "react-icons/fi";

const Reklama = () => {
  return (
    <div className="flex items-stretch justify-between p-10 max-w-[1500px] mx-auto mt-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-lg">
      <div className="w-1/2 pr-4 flex items-center"> 
        <img src={imgss} alt="Beauty Bay Boxes" className="object-cover w-full h-full rounded-lg shadow-md" />
      </div>
      <div className="w-1/2 pl-4 bg-white p-10 rounded-lg shadow-md flex flex-col justify-between">
        <h1 className="text-4xl font-bold text-black mb-4">IT'S NEVER TOO EARLY...</h1>
        <p className="text-lg text-gray-700 mb-6">
          Our BEAUTY BAY festive boxes are on their way. Be the first to hear when they land and join our waitlist.
        </p>
        <span className="text-lg font-bold text-black flex items-center">
          COMING SOON <FiArrowRight className="ml-2 text-blue-500" />
        </span>
      </div>
    </div>
  );
};

export default Reklama;
