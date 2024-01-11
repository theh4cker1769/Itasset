import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Location/AddLocation.css";
import LocationForm from "./EditFormLocation";
import LocationDataFetch from "./EditFormDataFetch";

const EditLocation = ({ sidebarOpen }) => {
  const params = useParams();
  const [data, setData] = useState("");
  const [office_name, setOffice_name] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [id, setId] = useState("");
  const [poc_email, setPoc_email] = useState("");
  const [poc_contact, setPoc_contact] = useState("");
  const [poc_name, setPoc_name] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zip_code, setZip_code] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const navigate = useNavigate();

  const CountryData = async () => {
    try {
      const response = await fetch("https://apis.itassetmgt.com:8443/api/v1/countries");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const StateData = async () => {
    try {
      const response = await fetch("https://apis.itassetmgt.com:8443/api/v1/states");
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  const CityData = async () => {
    try {
      const response = await fetch("https://apis.itassetmgt.com:8443/api/v1/cities");
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    CountryData();
    StateData();
    CityData();
  }, []);

  const updateLocation = async (e) => {
    e.preventDefault();

    const formData = {
      office_name: office_name,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      contact_person_email: poc_email,
      contact_person_phone: poc_contact,
      contact_person_name: poc_name,
      zip_code: zip_code,
      country: selectedCountry,
      state_province: selectedState,
      city: selectedCity,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/locations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      navigate("/location");
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  return (
    <>
      <main
        id="main"
        className={`main-content ${sidebarOpen ? "shift-right" : ""}`}
      >
        <div className="container-fluid" id="add-mainLocation">
          <div className="card" id="add-main">
            <section>
              <LocationDataFetch
                params={params}
                setData={setData}
                setId={setId}
                setOffice_name={setOffice_name}
                setPoc_email={setPoc_email}
                setPoc_contact={setPoc_contact}
                setPoc_name={setPoc_name}
                setAddressLine1={setAddressLine1}
                setAddressLine2={setAddressLine2}
                setSelectedCountry={setSelectedCountry}
                setSelectedState={setSelectedState}
                setSelectedCity={setSelectedCity}
                setZip_code={setZip_code}
              />

              <LocationForm
                office_name={office_name}
                setOffice_name={setOffice_name}
                addressLine1={addressLine1}
                setAddressLine1={setAddressLine1}
                addressLine2={addressLine2}
                setAddressLine2={setAddressLine2}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                countries={countries}
                setCountries={setCountries}
                states={states}
                setStates={setStates}
                cities={cities}
                setCities={setCities}
                zip_code={zip_code}
                setZip_code={setZip_code}
                poc_name={poc_name}
                setPoc_name={setPoc_name}
                poc_email={poc_email}
                setPoc_email={setPoc_email}
                poc_contact={poc_contact}
                setPoc_contact={setPoc_contact}
                updateLocation={updateLocation}
              />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditLocation;
