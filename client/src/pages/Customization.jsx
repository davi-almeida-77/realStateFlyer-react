import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Customization() {
  const [specialty, setSpecialty] = useState('');
  const [bio, setBio] = useState('');
  const [clients, setClients] = useState('');
  const [sales, setSales] = useState('');
  const [workPlaces, setWorkPlaces] = useState([
    { location: '', image: '' }
  ]);

  const navigate = useNavigate();

  const addWorkPlace = () => {
    setWorkPlaces([...workPlaces, { location: '', image: '' }]);
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
          <label className="text-[#1B374D] text-base font-medium mb-1 mx-3 capitalize text-left block">
            Specialty
          </label>
          <div className="flex items-center bg-[#F5F6F8] rounded-full px-4 py-2">
            <input
              type="text"
              className="flex-1 text-[#1B374D] placeholder-[#919BA2] placeholder:font-semibold placeholder:tracking-wider focus:outline-none font-semibold bg-transparent"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-[#1B374D] text-base font-medium mb-1 mx-3 capitalize text-left block">
            Mini Bio
          </label>
          <textarea
            className="w-full bg-[#F5F6F8] text-[#1B374D] placeholder-[#919BA2] placeholder:font-semibold placeholder:tracking-wider placeholder:text-center focus:outline-none font-semibold px-4 py-2 rounded-2xl resize-none items-center text-center flex justify-center" 
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="text-[#1B374D] text-base font-medium mb-1 mx-3 capitalize text-left block">
            Clients Number
          </label>
          <div className="flex items-center bg-[#F5F6F8] rounded-full px-4 py-2">
            <input
              type="text"
              className="flex-1 text-[#1B374D] placeholder-[#919BA2] placeholder:font-semibold placeholder:tracking-wider focus:outline-none font-semibold bg-transparent justify-center text-center items-center"
              value={clients}
              onChange={(e) => setClients(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-[#1B374D] text-base font-medium mb-1 mx-3 capitalize text-left block">
            Sales Number
          </label>
          <div className="flex-1 text-[#1B374D] placeholder-[#919BA2] placeholder:font-semibold placeholder:tracking-wider focus:outline-none font-semibold bg-transparent justify-center text-center items-center">
            <div className="flex items-center bg-[#F5F6F8] rounded-full px-4 py-2">
            <input
              type="text"
              className="flex-1 text-[#1B374D] placeholder-[#919BA2] placeholder:font-semibold placeholder:tracking-wider focus:outline-none font-semibold bg-transparent justify-center text-center items-center"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
            />
          </div>
          </div>
        </div>

        <div>
          <label className="text-[#1B374D] text-base font-medium mb-2 mx-3 capitalize text-left block">
            Work Places
          </label>
          {workPlaces.map((place, index) => (
            <div key={index} className="mb-4 bg-[#F5F6F8] rounded-2xl p-4">
              <label className="block mb-1 text-sm text-[#1B374D] font-medium">Location Name</label>
              <input
                type="text"
                className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full mb-2 text-[#1B374D] focus:outline-none"
                value={place.location}
                onChange={(e) => updateWorkPlace(index, 'location', e.target.value)}
              />
              <label className="block mb-1 text-sm text-[#1B374D] font-medium">Image URL</label>
              <input
                type="text"
                className="w-full bg-white border border-[#CCC] px-3 py-2 rounded-full text-[#1B374D] focus:outline-none"
                value={place.image}
                onChange={(e) => updateWorkPlace(index, 'image', e.target.value)}
              />
            </div>
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
