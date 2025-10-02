import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoSearchOutline } from "react-icons/io5";

const slides = [
  {
    title: "MIAMI BEACH REAL STATE EXPERTS",
    description: "Over 1000+ Happy Clients Served in Miami, FL",
    subDescription: "Discover Your Dream Home in Miami! Experience luxury living in the heart of Miami. Whether you’re looking for a modern condo with stunning ocean views or a spacious family home in a vibrant neighborhood, we have the perfect property for you. Live the Miami lifestyle—sun, style, and sophistication await. Contact us today for exclusive listings and private tours!",
    image: "https://images.unsplash.com/photo-1589083130544-0d6a2926e519?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJhaWElMjBtaWFtaXxlbnwwfHwwfHx8MA%3D%3D",
    buttonText: "Search Homes",
    buttonLink: "/search/miami"
  },
  {
    title: "NEW YORK CITY LUXURY APARTMENTS",
    description: "Find your dream home in NYC's bustling metropolis.",
    subDescription: "From cozy lofts to penthouses with skyline views, explore exclusive listings curated just for you. Modern living at its best awaits in the heart of New York.",
    image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcGVsJTIwZGUlMjBwYXJlZGUlMjBub3ZhJTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D",
    buttonText: "Explore NYC",
    buttonLink: "/search/nyc"
  },
  {
    title: "SÃO PAULO PREMIUM PROPERTIES",
    description: "High-end condos and houses in SP’s best neighborhoods.",
    subDescription: "Discover premium properties in São Paulo tailored for elegance and comfort. We offer carefully curated options for modern urban living in Brazil’s biggest city.",
    image: "https://www.papoimobiliario.com/wp-content/uploads/2025/08/vista-de-alto-angulo-da-paisagem-urbana-scaled.jpg",
    buttonText: "View Listings",
    buttonLink: "/search/sp"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    autoplay: true,
    autoplaySpeed: 20000,
    fade: true,
    infinite: true,
    arrows: false,
    dots: false,
    speed: 1000,
    pauseOnHover: false,
    cssEase: "ease-in-out",
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <div className="relative w-full h-[calc(100vh-96px)] overflow-hidden">
      <Slider {...settings}>
        {slides.map(({ title, description, subDescription, image, buttonText, buttonLink }, idx) => (
          <div key={idx} className="relative w-full h-[calc(100vh-96px)] overflow-hidden">

            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-75"
              style={{ backgroundImage: `url(${image})` }}
            />


            <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center justify-center px-6 py-10 text-white">
              <div className="flex w-full justify-center items-center space-x-8">


                <div className="w-1/2 flex flex-col justify-center items-center text-center">
                  <h1 className="text-7xl w-8/12 font-light uppercase">{title}</h1>
                  <div className="mt-4 bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-lg p-4 max-w-xs">
                    <p className="text-gray-100">{description}</p>
                  </div>
                </div>


                <div className="w-1/2 flex flex-col justify-start items-start">
                  <div className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-lg p-6 max-w-md">
                    <p className="text-sm text-white">{subDescription}</p>
                    <a
                      href={buttonLink}
                      className="mt-4 inline-flex items-center gap-2 bg-white text-black px-4 py-2 text-sm font-semibold rounded hover:bg-gray-200 transition-colors duration-300"
                    >
                      <IoSearchOutline className="size-4" />
                      {buttonText}
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </Slider>


      <div className="absolute bottom-6 right-8 text-white bg-black bg-opacity-50 rounded px-4 py-1 text-sm font-mono select-none">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}
