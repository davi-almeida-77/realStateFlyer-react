import React, { useRef } from "react";
import Slider from "react-slick";
import { FaBath, FaBed, FaCar, FaRulerCombined } from "react-icons/fa";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const FeaturedProperty = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const goPrev = () => sliderRef.current?.slickPrev();
  const goNext = () => sliderRef.current?.slickNext();

  const propertyCards = [
    {
      image: "https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2019/06/o-que-fazer-no-rj-1024x683.jpg",
      location: "Rio de Janeiro, RJ",
      stars: 5,
    },
    {
      image: "https://images.ctfassets.net/uzue8dgm4ubt/3emHxfHQAWY0VM4KPh3sT1/05b0455ab7f97cd4f4862b0b5b00e52f/SP.jpg?fm=jpg&w=1080&fit=scale",
      location: "São Paulo, SP",
      stars: 4,
    },
    {
      image: "https://www.voltologo.net/wp-content/uploads/2022/07/pontos-turisticos-de-salvador-bahia.jpg.webp",
      location: "Salvador, BA",
      stars: 4.5,
    },
    {
      image: "https://mid-noticias.curitiba.pr.gov.br/2022/00345086.jpg",
      location: "Curitiba, PR",
      stars: 4,
    },
    {
      image: "https://uploads.grupodicas.com/2024/04/recife.jpg",
      location: "Recife, PE",
      stars: 5,
    },
    {
      image: "https://turismo.b-cdn.net/wp-content/uploads/2013/01/Fortaleza-a-capital-do-Ceara.webp",
      location: "Fortaleza, CE",
      stars: 4.2,
    },
  ];

  const smallBoxSize = 120;

  return (
    <>
      <Header />

      <section
        className="relative w-full bg-cover bg-center flex items-center justify-end px-8"
        style={{
          backgroundImage:
            "url('https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/08/04/91c823dd-f974-4996-8c84-cdc6f71034b0_f4f060f0.jpg')",
          minHeight: "100vh",
        }}
      >
        <div className="p-6 flex overflow-hidden">
          <div
            className="flex flex-col justify-between bg-white border border-gray-500 text-[#1B374D] p-6"
            style={{ width: 360 }}
          >
            <h2 className="text-6xl font-bold mb-4">$1,200,000</h2>

            <div className="mb-5 text-1xl font-bold">
              <p>123 Flower St</p>
              <p>São Paulo, SP</p>
            </div>

            <button className="bg-[#1B374D] text-white font-semibold py-3 rounded-lg hover:bg-[#16304a] transition duration-300 capitalize text-center">
              View Property
            </button>
          </div>

          <div
            className="grid grid-cols-2 grid-rows-2 border border-gray-500"
            style={{
              width: smallBoxSize * 2,
            }}
          >
            <InfoBox icon={<FaBed size={24} />} text="4 BEDROOMS" />
            <InfoBox icon={<FaBath size={24} />} text="3 BATHROOMS" />
            <InfoBox icon={<FaCar size={24} />} text="2 PARKING" />
            <InfoBox icon={<FaRulerCombined size={24} />} text="250 m²" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 relative">
        <div className="bg-opacity-40 backdrop-blur-md rounded-none p-6 relative">
                  <button
          onClick={goPrev}
          aria-label="Previous"
          className="absolute top-1/2 -translate-y-1/2 z-20 text-3xl text-white p-2 rounded-sm hover:text-slate-600 transition"
          style={{ left: '1rem' }}
        >
          &#8592;
        </button>

        <button
          onClick={goNext}
          aria-label="Next"
          className="absolute top-1/2 -translate-y-1/2 z-20 text-3xl text-white p-2 rounded-sm hover:text-slate-600 transition"
          style={{ right: '1rem' }}
        >
          &#8594;
        </button>


          <Slider ref={sliderRef} {...settings} className="space-x-2">
            {propertyCards.map(({ image, location, stars }, idx) => (
              <div key={idx} className="px-1">
                <div
                  className="relative h-56 overflow-hidden group cursor-pointer"
                  style={{ borderRadius: 0 }}
                >
                  <img
                    src={image}
                    alt={location}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <div className="text-xl font-semibold">{location}</div>
                    <div className="mt-1 text-yellow-400 text-2xl">
                      {Array(Math.floor(stars))
                        .fill("★")
                        .join("")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <Footer />
    </>
  );
};

const InfoBox = ({ icon, text }) => {
  const size = 120;
  return (
    <div
      className="bg-black bg-opacity-60 text-white flex flex-col items-center justify-center p-2 border-gray-500"
      style={{
        width: size,
        height: size,
        borderRight: "1px solid #6b7280",
        borderBottom: "1px solid #6b7280",
        borderRadius: 0,
      }}
    >
      {icon}
      <span className="mt-2 font-bold text-center text-sm">{text}</span>
    </div>
  );
};

export default FeaturedProperty;
