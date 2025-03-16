import React, { useState, useEffect } from "react";
import { create } from "zustand";
import { FiMoon } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

const useCountryStore = create((set) => ({
  countries: [],
  setCountries: (data) => set({ countries: data }),
}));

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const { countries, setCountries } = useCountryStore();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((country) => ({
          name: country.name.common,
          population: country.population.toLocaleString(),
          region: country.region,
          capital: country.capital ? country.capital[0] : "N/A",
          flag: country.flags.svg,
        }));
        setCountries(formattedData);
      });
  }, [setCountries]);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(query.toLowerCase()) &&
      (selectedRegion === "" || country.region === selectedRegion)
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Where in the world?</h1>
        <h1 className=" flex items-center font-bold cursor-pointer">
          <FiMoon className="text-xl" />
          <span className="ml-3">Dark Mode</span>
        </h1>
      </div>

      <div className="mt-6 flex justify-between flex-wrap gap-4">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search for a country..."
            className="pl-10 pr-4 py-2 w-full border rounded shadow focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select
          className="border rounded shadow p-2 w-40"
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {filteredCountries.map((country) => (
          <div key={country.name} className="bg-white p-4 rounded shadow">
            <img src={country.flag} alt={country.name} className="w-full h-32 object-cover rounded" />
            <h2 className="font-bold text-lg mt-2">{country.name}</h2>
            <p><strong>Population:</strong> {country.population}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Capital:</strong> {country.capital}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
