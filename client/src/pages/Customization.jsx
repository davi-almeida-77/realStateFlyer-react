import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure, Listbox } from '@headlessui/react';

const propertyTypes = ["Apartment", "House", "Townhouse", "Lot", "Penthouse"];

function Customization() {
  const [specialty, setSpecialty] = useState('');
  const [bio, setBio] = useState('');
  const [clients, setClients] = useState('');
  const [sales, setSales] = useState('');
  const [workPlaces, setWorkPlaces] = useState([
    {
      location: '',
      image: '',
      propertyType: '',
      totalArea: '',
      usableArea: '',
      bedrooms: '',
      bathrooms: '',
      laundryArea: '',
      parkingSpots: '',
      swimmingPool: '',
      floor: '',
      marketValue: '',
      appreciation: ''
    }
  ]);

  const navigate = useNavigate();

  const addWorkPlace = () => {
    setWorkPlaces([
      ...workPlaces,
      {
        location: '',
        image: '',
        propertyType: '',
        totalArea: '',
        usableArea: '',
        bedrooms: '',
        bathrooms: '',
        laundryArea: '',
        parkingSpots: '',
        swimmingPool: '',
        floor: '',
        marketValue: '',
        appreciation: ''
      }
    ]);
  };

  const updateWorkPlace = (index, field, value) => {
    const updated = [...workPlaces];
    updated[index][field] = value;
    setWorkPlaces(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('specialty', specialty);
    localStorage.setItem('bio', bio);
    localStorage.setItem('clients', clients);
    localStorage.setItem('sales', sales);
    localStorage.setItem('workPlaces', JSON.stringify(workPlaces));

    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 mt-5 mb-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl space-y-6"
      >
        <h1 className="text-[#1B374D] text-6xl font-normal mb-3 text-left">Customization</h1>


        <div>
          <label className="text-[#1B374D] text-base font-medium mb-1 mx-3 block">
            Specialty
          </label>
          <div className="flex items-center bg-[#F5F6F8] rounded-full px-4 py-2">
            <input
              type="text"
              className="flex-1 text-[#1B374D] placeholder-[#919BA2] font-semibold focus:outline-none bg-transparent"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </div>
        </div>


        <div>
          <label className="text-[#1B374D] text-base font-medium mb-1 mx-3 block">
            Mini Bio
          </label>
          <textarea
            className="w-full bg-[#F5F6F8] text-[#1B374D] placeholder-[#919BA2] font-semibold focus:outline-none px-4 py-2 rounded-2xl resize-none text-center"
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>


        <div>
          <label className="text-[#1B374D] text-base font-medium mb-1 mx-3 block">
            Clients Number
          </label>
          <div className="flex items-center bg-[#F5F6F8] rounded-full px-4 py-2">
            <input
              type="text"
              className="flex-1 text-[#1B374D] placeholder-[#919BA2] font-semibold focus:outline-none bg-transparent text-center"
              value={clients}
              onChange={(e) => setClients(e.target.value)}
            />
          </div>
        </div>


        <div>
          <label className="text-[#1B374D] text-base font-medium mb-1 mx-3 block">
            Sales Number
          </label>
          <div className="flex items-center bg-[#F5F6F8] rounded-full px-4 py-2">
            <input
              type="text"
              className="flex-1 text-[#1B374D] placeholder-[#919BA2] font-semibold focus:outline-none bg-transparent text-center"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
            />
          </div>
        </div>


        <div>
          <label className="text-[#1B374D] text-base font-medium mb-2 mx-3 block">
            Work Places
          </label>
          {workPlaces.map((place, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="mb-4 bg-[#F5F6F8] rounded-2xl p-4">
                  <Disclosure.Button className="w-full text-left text-[#1B374D] font-semibold flex justify-between items-center">
                    {place.location || `Property ${index + 1}`} <span>{open ? "-" : "+"}</span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="mt-3 space-y-2">

                    <label className="block text-sm text-[#1B374D] font-medium">Location Name</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full mb-2 text-[#1B374D] focus:outline-none"
                      value={place.location}
                      onChange={(e) => updateWorkPlace(index, 'location', e.target.value)}
                    />


                    <label className="block text-sm text-[#1B374D] font-medium">Image URL</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full mb-2 text-[#1B374D] focus:outline-none"
                      value={place.image}
                      onChange={(e) => updateWorkPlace(index, 'image', e.target.value)}
                    />


                    <label className="block text-sm text-[#1B374D] font-medium">Property Type</label>
                    <Listbox
                      value={place.propertyType}
                      onChange={(val) => updateWorkPlace(index, 'propertyType', val)}
                    >
                      <Listbox.Button className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-left text-[#1B374D]">
                        {place.propertyType || "Select"}
                      </Listbox.Button>
                      <Listbox.Options className="mt-1 bg-white border border-[#CCC] rounded-xl">
                        {propertyTypes.map((type, i) => (
                          <Listbox.Option key={i} value={type} className="px-3 py-2 hover:bg-[#F5F6F8] cursor-pointer">
                            {type}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>


                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm text-[#1B374D] font-medium">Total Area (m²)</label>
                        <input
                          type="number"
                          className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                          value={place.totalArea}
                          onChange={(e) => updateWorkPlace(index, 'totalArea', e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-[#1B374D] font-medium">Usable Area (m²)</label>
                        <input
                          type="number"
                          className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                          value={place.usableArea}
                          onChange={(e) => updateWorkPlace(index, 'usableArea', e.target.value)}
                        />
                      </div>
                    </div>


                    <label className="block text-sm text-[#1B374D] font-medium">Bedrooms</label>
                    <input
                      type="number"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                      value={place.bedrooms}
                      onChange={(e) => updateWorkPlace(index, 'bedrooms', e.target.value)}
                    />


                    <label className="block text-sm text-[#1B374D] font-medium">Bathrooms</label>
                    <input
                      type="number"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                      value={place.bathrooms}
                      onChange={(e) => updateWorkPlace(index, 'bathrooms', e.target.value)}
                    />


                    <label className="block text-sm text-[#1B374D] font-medium">Laundry Area (m²)</label>
                    <input
                      type="number"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                      value={place.laundryArea}
                      onChange={(e) => updateWorkPlace(index, 'laundryArea', e.target.value)}
                    />


                    <label className="block text-sm text-[#1B374D] font-medium">Parking Spots</label>
                    <input
                      type="number"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                      value={place.parkingSpots}
                      onChange={(e) => updateWorkPlace(index, 'parkingSpots', e.target.value)}
                    />


                    <label className="block text-sm text-[#1B374D] font-medium">Swimming Pool (Yes/No)</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                      value={place.swimmingPool}
                      onChange={(e) => updateWorkPlace(index, 'swimmingPool', e.target.value)}
                    />


                    <label className="block text-sm text-[#1B374D] font-medium">Floor (if apartment)</label>
                    <input
                      type="number"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                      value={place.floor}
                      onChange={(e) => updateWorkPlace(index, 'floor', e.target.value)}
                    />


                    <label className="block text-sm text-[#1B374D] font-medium">Market Value ($)</label>
                    <input
                      type="number"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                      value={place.marketValue}
                      onChange={(e) => updateWorkPlace(index, 'marketValue', e.target.value)}
                    />


                    <label className="block text-sm text-[#1B374D] font-medium">Appreciation Potential (%)</label>
                    <input
                      type="number"
                      className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                      value={place.appreciation}
                      onChange={(e) => updateWorkPlace(index, 'appreciation', e.target.value)}
                    />
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
          <button
            type="button"
            onClick={addWorkPlace}
            className="mt-2 bg-[#1B374D] text-white px-4 py-2 rounded-full hover:bg-[#e0e2e5] transition-colors duration-300"
          >
            + Add Work Place
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1B374D] text-white py-3 rounded-full font-normal shadow mt-5 transition-colors duration-300 hover:bg-[#e0e2e5]"
        >
          Finish and See Profile
        </button>
      </form>
    </div>
  );
}

export default Customization;
