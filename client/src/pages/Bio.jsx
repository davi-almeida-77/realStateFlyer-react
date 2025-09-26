import { Tab } from "@headlessui/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function BioPage() {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6 mt-[10%]">

      <div className="flex justify-center items-start">
        <img
          src="https://t3.ftcdn.net/jpg/06/32/04/82/240_F_632048223_OmuLTk9nsw1xj4Ib4oZ5L6cseT0HndJE.jpg"
          alt="Aaron Kirkman"
          className="rounded-2xl shadow-md object-cover w-72 h-96"
        />
      </div>


      <div className="flex flex-col space-y-6">
        <Tab.Group>

          <Tab.List className="flex space-x-4 ">
            {["Bio", "Active Listings", "Sold Listings"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "px-4 py-2 text-sm font-medium focus:outline-none transition-all duration-500 ease-in-out",
                    selected
                      ? "border-t-2 border-l-2 border-r-2 border-blue-500 border-b-2 border-b-transparent text-slate-800 bg-white"
                      : "text-slate-800 hover:text-slate-600 hover:border-b-2 hover:border-gray-300"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>


          <Tab.Panels className="mt-4 min-h-[650px] transition-all duration-500 ease-in-out">

            <Tab.Panel className="transition-opacity duration-700 ease-in-out">
              <div className="space-y-6">
                <div>
                  <h1 className="text-5xl font-light tracking-wide text-slate-800">
                    AARON <span className="font-bold">KIRKMAN</span>
                  </h1>
                  <h2 className="text-xl font-semibold text-slate-600 tracking-wide">
                    LUXURY RESIDENCE SPECIALIST
                  </h2>
                </div>

                <div className="flex space-x-8 tracking-wider text-sm text-slate-700">
                  <p>Email: aaron.kirkman@realestate.com</p>
                  <p>ID: 4598732</p>
                  <p>License: FL-92837</p>
                </div>

                <div className="p-4 space-y-4 bg-white shadow-sm rounded-md">
                  <p className="leading-relaxed mb-4 max-h-[300px] overflow-hidden text-ellipsis text-slate-800">
                    With over 15 years of expertise in the luxury real estate market, Aaron Kirkman has built a reputation for excellence and integrity. His portfolio spans some of the most exclusive neighborhoods in Miami, New York, and Las Vegas.
                  </p>
                  <p className="leading-relaxed mb-4 max-h-[300px] overflow-hidden text-ellipsis text-slate-800">
                    Aaron’s approach combines personalized client care with cutting-edge marketing strategies. From waterfront penthouses to private estates, his attention to detail and negotiation skills ensure clients achieve their real estate goals seamlessly.
                  </p>
                  <p className="leading-relaxed mb-4 max-h-[300px] overflow-hidden text-ellipsis text-slate-800">
                    As a trusted advisor to international investors and high-net worth individuals, Aaron continues to set new benchmarks in the luxury housing sector, making every transaction an exclusive experience.
                  </p>
                </div>
              </div>
            </Tab.Panel>

  
            <Tab.Panel className="transition-opacity duration-700 ease-in-out">
              <div className="flex flex-wrap gap-3 p-4">
                {[
                  "Miami", "New York", "Las Vegas", "Los Angeles", "Chicago",
                  "Orlando", "San Francisco", "Dallas", "Atlanta", "Houston",
                  "Boston", "Seattle"
                ].map((city) => (
                  <button
                    key={city}
                    className="px-4 py-2 rounded-3xl border border-slate-700 font-semibold text-slate-900 hover:bg-slate-500 hover:text-white transition-all duration-500 ease-in-out"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </Tab.Panel>


            <Tab.Panel className="transition-opacity duration-700 ease-in-out">
              <div className="flex flex-wrap gap-3 p-4">
                {[
                  "Miami", "New York", "Las Vegas", "Los Angeles", "Florida",
                  "Palm Beach", "San Diego", "Houston", "Boston", "Seattle",
                  "Orlando", "Austin"
                ].map((city) => (
                  <button
                    key={city}
                    className="px-4 py-2 rounded-3xl border border-slate-700 font-semibold text-slate-900 hover:bg-slate-500 hover:text-white transition-all duration-500 ease-in-out"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
