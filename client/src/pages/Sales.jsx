import React from "react";
import { FaBath, FaBed, FaCar, FaRulerCombined } from "react-icons/fa";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const FeaturedProperty = () => {
  const smallBoxSize = 120;

  return (
    <>
      <Header />

      <section
        className="relative w-full bg-cover bg-center flex items-center justify-end px-8"
        style={{
          backgroundImage: "url('https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2022/08/04/91c823dd-f974-4996-8c84-cdc6f71034b0_f4f060f0.jpg')",
          minHeight: "100vh",
        }}
      >
        <div className=" p-6 flex overflow-hidden ">

          <div
            className="flex flex-col justify-between bg-white border border-gray-500 text-[#1B374D] p-6 "
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
            className="grid grid-cols-2 grid-rows-2 border border-gray-500 "
            style={{
              width: smallBoxSize * 2,
            }}
          >
            <InfoBox icon={<FaBed size={24} />} text="4 BEDROOMS" />
            <InfoBox icon={<FaBath size={24} />} text="3 BATHROOMS" />
            <InfoBox icon={<FaCar size={24} />} text="2 PARKING " />
            <InfoBox icon={<FaRulerCombined size={24} />} text="250 m²" />
          </div>
        </div>
      </section>

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
        borderBottom: "1px solid #6b7280"
      }}
    >
      {icon}
      <span className="mt-2 font-bold text-center text-sm">{text}</span>
    </div>
  );
};

export default FeaturedProperty;
