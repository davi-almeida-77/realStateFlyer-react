import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/20/solid'

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

      <main className="flex-grow px-6 py-10">
        <h1 className="text-3xl font-bold">Página Home</h1>
        <p className="mt-4 text-gray-600">Conteúdo principal vai aqui...</p>
      </main>

      <footer className="backdrop-blur-sm flex justify-center items-center h-14 bg-slate-200  uppercase font-bold text-slate-800 hover:text-slate-600 transition-colors duration-300 cursor-pointer">
        © 2025 
      </footer>
    </div>
  )
}
