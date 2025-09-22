import { Fragment } from 'react'
import { Popover, Transition, Button } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/20/solid'
import { IoSearchOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage:"url('')"}}>
      <header className="bg-white/30 backdrop-blur border-b border-white/40 shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <div className="flex-1">
            <div className="text-6xl text-slate-800 hover:text-slate-600 transition-colors duration-300 uppercase font-light ml-6 cursor-pointer">RealStateFlyer</div>
          </div>

          <div className="flex-1 flex justify-center space-x-6 items-center uppercase">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="inline-flex items-center gap-1 text-slate-800 uppercase hover:text-slate-600 transition-colors duration-300 font-medium focus:outline-none">
                    Properties
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 mt-2 w-48 rounded-md shadow-xl bg-slate-300 backdrop-blur border border-white/30 p-2">
                      <ul className="text-sm text-gray-800 space-y-1">
                        <li className="hover:bg-white/40 rounded px-3 py-1 cursor-pointer font-medium transition-colors duration-300">MIAMI</li>
                        <li className="hover:bg-white/40 rounded px-3 py-1 cursor-pointer font-medium transition-colors duration-300">LOS ANGELES</li>
                        <li className="hover:bg-white/40 rounded px-3 py-1 cursor-pointer font-medium transition-colors duration-300">New YORK</li>
                      </ul>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <button className="text-slate-800 hover:text-slate-600 font-medium uppercase transition-colors duration-300">Bio</button>
          </div>

          <div className="flex-1 flex justify-end items-center space-x-2">
            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-transparent hover:border-gray-300 cursor-pointer transition">
              <PhoneIcon className="w-5 h-5 text-gray-700" />
            </div>
            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-transparent hover:border-gray-300 cursor-pointer transition">
              <EnvelopeIcon className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        </div>
      </header>

              
      <main className="flex grow px-6 py-10">
        <div className="flex w-full justify-center items-center space-x-8">


          <div className="w-1/2 flex flex-col justify-center items-center text-center">
            <h1 className="text-7xl w-8/12  font-light"> MIAMI BEACH REAL STATE EXPERTS </h1>
            <p className="mt-4 text-gray-600"> Over 1000+ Happy CLients Served in Miami, FL </p>
          </div>


    <div className="w-1/2">
      <p className='w-7/12'>
          Discover Your Dream Home in Miami!
          Experience luxury living in the heart of Miami. Whether you’re looking for a modern condo with stunning ocean views or a spacious 
          family home in a vibrant neighborhood, we have the perfect property for you.
          Live the Miami lifestyle—sun, style, and sophistication await 
          Contact us today for exclusive listings and private tours!
      </p>
        <Button className="rounded bg-slate-800 px-4 py-2 text-sm text-white font-semibold data-active:bg-sky-700 data-hover:bg-sky-500 mt-4 hover:bg-slate-400 transition-colors duration-600">
              <span className="flex items-center gap-2">
          <IoSearchOutline className='font-bold size-4'  />
              Search Homes
              </span>
          </Button>

          </div>
          
        </div>
      </main>

      <footer className="backdrop-blur-sm flex justify-center items-center h-14 bg-slate-200  uppercase font-bold text-slate-800 hover:text-slate-600 transition-colors duration-300 cursor-pointer">
        © 2025 
      </footer>
    </div>
  )
}
