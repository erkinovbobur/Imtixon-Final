
import { useState, useRef } from "react";
import women from "../../assets/women.mp4";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Banner = () => {
  

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true); 

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted; 
      setIsMuted(!isMuted); 
    }
  };

  return (
    <>
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden flex items-center justify-center bg-gray-900">
        <video
          ref={videoRef} 
          src={women}
          className="absolute inset-0 w-full h-[700px] object-cover"
          autoPlay
          loop
          muted={isMuted} 
          playsInline
        ></video>

        <div className="absolute inset-0 bg-black opacity-50"></div>

        <button
          onClick={toggleMute}
          className="absolute z-20 bottom-5 right-5 bg-gray-800 p-3 rounded-full shadow-lg text-white text-xl hover:bg-gray-700 transition duration-300"
        >
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>

        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Discover the Latest in Makeup
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 animate-fade-in-up delay-200">
            Explore our wide range of beauty products.
          </p>
          {/* <button className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in-up delay-400">
            Shop Now
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Banner;
