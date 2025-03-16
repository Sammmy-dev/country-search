import React, { useState } from "react";
import { create } from "zustand";
import { FiMoon } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

const useCountryStore = create((set) => ({
  countries: [
    { name: "Germany", population: "81,770,900", region: "Europe", capital: "Berlin", flag: "🇩🇪" },
    { name: "United States of America", population: "323,947,000", region: "Americas", capital: "Washington, D.C.", flag: "🇺🇸" },
    { name: "Brazil", population: "206,135,893", region: "Americas", capital: "Brasília", flag: "🇧🇷" },
    { name: "Iceland", population: "334,300", region: "Europe", capital: "Reykjavík", flag: "🇮🇸" },
    { name: "Afghanistan", population: "27,657,145", region: "Asia", capital: "Kabul", flag: "🇦🇫" },
    { name: "Åland Islands", population: "28,875", region: "Europe", capital: "Mariehamn", flag: "🇦🇽" },
    { name: "Albania", population: "2,886,026", region: "Europe", capital: "Tirana", flag: "🇦🇱" },
    { name: "Algeria", population: "40,400,000", region: "Africa", capital: "Algiers", flag: "🇩🇿" },
  ],
  filterRegion: (region) =>
    set((state) => ({
      countries: state.countries.filter((country) => country.region === region),
    })),
}));

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const { countries } = useCountryStore();

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(query.toLowerCase()) &&
      (selectedRegion === "" || country.region === selectedRegion)
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Where in the world?</h1>
        <FiMoon className="text-xl cursor-pointer" />
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
            <div className="text-5xl text-center">{country.flag}</div>
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
