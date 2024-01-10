import React, { useEffect, useState } from "react";
import { API_BASE_URL } from './../apiConfig';

const CountrySelect = ({ onSelectCountry, selectedCountry }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/countries`);
        const data = await response.json();
        setCountries(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
      
    };
  
    fetchCountries();
  }, []);
  
  return (
    <div>
      <select className="form-control" onChange={(e) => onSelectCountry(e.target.value)} value={selectedCountry}>
        <option value="">Select Here</option>

        {loading ? ( // Render loading state if still loading
          <option>Loading...</option>
        ) : Array.isArray(countries) ? (

          countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))
        ) : (
          <option>No data found</option>
        )}
      </select>
    </div>
  );
};

export default CountrySelect;
