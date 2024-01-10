import React, { useEffect, useState } from "react";
import { API_BASE_URL } from './../apiConfig';
// import { List } from "react-virtualized";


const CitySelect = ({ selectedCountryId, selectedStateId, onSelectCity, selectedCity }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (!selectedCountryId || !selectedStateId) {
          setCities([]);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/state/${selectedStateId}`);
        const data = await response.json();
        setCities(data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedCountryId, selectedStateId]);

  return (
    <select className="form-control" onChange={(e) => onSelectCity(e.target.value)} value={selectedCity}>
      <option>Select a City</option>
      {Array.isArray(cities) ? (
        cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))
      ) : (
        <option>No cities found for the selected state</option>
      )}
    </select>
  );
};

export default CitySelect;
