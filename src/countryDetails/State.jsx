import React, { useEffect, useState } from "react";
import { API_BASE_URL } from './../apiConfig';
// import { List } from "react-virtualized";


const StateSelect = ({ selectedCountryId, onSelectState, selectedState }) => {
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setIsLoading(true); // Set loading state
        if (!selectedCountryId) {
          setStates([]);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/countries/state/${selectedCountryId}`);
        const data = await response.json();
        setStates(data.data);
        setIsLoading(false); // Clear loading state
      } catch (error) {
        console.error("Error fetching states:", error);
        setIsLoading(false); // Clear loading state
      }
    };

    fetchStates();
  }, [selectedCountryId]);

  return (
    <div>
      <select className="form-control" onChange={(e) => onSelectState(e.target.value)} value={selectedState}>
        <option>Select a State</option>
        {isLoading ? (
          <option>Loading...</option>
        ) : (
          states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default StateSelect;
