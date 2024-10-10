
import Slider from "react-slick";
import a from "../../assets/brendsimg/a.png";
import b from "../../assets/brendsimg/b.png";
import d from "../../assets/brendsimg/d.png";
import e from "../../assets/brendsimg/e.webp";
import g from "../../assets/brendsimg/g.png";
import s from "../../assets/brendsimg/s.png";
import v from "../../assets/brendsimg/v.png";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const Brands = () => {
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 3, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-8 max-w-[1800px] mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">SHOP BY BRAND</h1>
      <Slider {...settings}>
        {[
          { img: a },
          { img: b  },
          { img: d  },
          { img: e  },
          { img: g },
          { img: s  },
          { img: v  },
        ].map((brand, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center p-6 rounded-lg transition-all hover:scale-105">
            <img src={brand.img}  className="h-[300px] w-auto object-contain" />
           </div>
        ))}
      </Slider>
    </div>
  );
};

export default Brands;
