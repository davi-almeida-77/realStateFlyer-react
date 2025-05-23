import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
import { PiLockLight } from "react-icons/pi";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlashLight } from "react-icons/pi";
import { SwitchDemo } from "../components/Button";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl">
        <h2 className="text-[#1B374D] text-6xl font-normal mb-3 text-left ">Register</h2>
        <h3 className="text-[#1B374D] text-base font-medium mb-4 mx-3 capitalize text-left"> Please Register to Login </h3>


        <div className="flex items-center bg-[#F5F6F8] rounded-full px-4 py-2 mb-4">
          <CiUser size={20} className="text-[#1B374D] mr-3" />
          <input
            type="text"
            placeholder="Username"
            className="flex-1 text-[#1B374D] placeholder-[#919BA2] placeholder:font-semibold placeholder:tracking-wider focus:outline-none font-semibold bg-transparent"
          />
        </div>


        <div className="flex items-center bg-[#F5F6F8] rounded-full px-4 py-2 mb-4">
          <PiPhoneLight size={20} className="text-[#1B374D] mr-3" />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="flex-1 text-[#1B374D] placeholder-[#919BA2] placeholder:font-semibold placeholder:tracking-wider focus:outline-none font-semibold bg-transparent"
          />
        </div>


        <div className="flex items-center bg-[#F5F6F8] rounded-full px-4 py-2 mb-4">
          <PiLockLight size={20} className="text-[#1B374D] mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="***********"
            className="flex-1 text-[#1B374D] placeholder-[#919BA2] placeholder:font-semibold placeholder:tracking-wider focus:outline-none font-semibold bg-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-3 text-[#1B374D]"
          >
            {showPassword ? <PiEyeSlashLight /> : <PiEyeLight />}
          </button>
        </div>


        <div className="flex items-center justify-between mb-4">
          <span className="text-[#1b374d] font-semibold text-sm lowercase mt-3 mx-3">REMINDER ME NEXT TIME</span>
        <SwitchDemo />
        </div>


        <button className="w-full bg-[#1B374D] rounded-full  text-[#FFF] py-3 font-normal shadow mt-5 transition-colors duration-300 hover:bg-[#e0e2e5]">
          Sign In
        </button>


        <div className="text-center mt-4">
          <span className="text-[#1B374D]">Already have an account? </span>
          <a href="/login" className="text-[#1B374D] underline font-semibold ">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
