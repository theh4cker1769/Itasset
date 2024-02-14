import React, { useEffect, useState } from "react";
import "../Location/AddLocation.css";
import AddForm from "./AddForm";
import AddFormDataFetch from "./AddFormDataFetch";

const AddLocation = ({ sidebarOpen }) => {
  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");

  const [location, setLocation] = useState([]);
  const [office_name, setOffice_name] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [poc_email, setPoc_email] = useState("");
  const [poc_contact, setPoc_contact] = useState("");
  const [poc_name, setPoc_name] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zip_code, setZip_code] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);

  const url = `${process.env.REACT_APP_API_BASE_URL}/api/locations`

  useEffect(() => {
    const areFieldsFilled =
      office_name !== "" &&
      poc_email !== "" &&
      poc_contact !== "" &&
      poc_name !== "" &&
      zip_code !== "" &&
      selectedCountry &&
      selectedState &&
      selectedCity;
    setAllFieldsFilled(areFieldsFilled);
  }, [
    office_name,
    poc_email,
    poc_contact,
    poc_name,
    zip_code,
    selectedCountry,
    selectedState,
    selectedCity,
  ]);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
    setPoc_email(email);
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const phoneRegex = /^[\d+]*$/;
    setIsValidPhone(phoneRegex.test(phone));
    setPoc_contact(phone);
  };

  const handleFormSubmit = () => {
    const formData = {
      office_name: office_name,
      contact_person_email: poc_email,
      contact_person_phone: poc_contact,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      contact_person_name: poc_name,
      zip_code: zip_code,
      country: selectedCountry,
      state_province: selectedState,
      city: selectedCity,
      user_id: userID,
      company_id: companyID
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        window.location.href = "/location";
        return response.json();
      })
      .then(() => {
        setLocation([...location, formData]);
        setOffice_name("");
        setAddressLine1("");
        setAddressLine2("");
        setPoc_email("");
        setPoc_contact("");
        setPoc_name("");
        setZip_code("");
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
      })
      .catch((error) => { });
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
              <AddFormDataFetch
                setCountries={setCountries}
                setStates={setStates}
                setCities={setCities}
              />
              <AddForm
                countries={countries}
                states={states}
                cities={cities}
                selectedCountry={selectedCountry}
                selectedState={selectedState}
                selectedCity={selectedCity}
                setSelectedCountry={setSelectedCountry}
                setSelectedState={setSelectedState}
                setSelectedCity={setSelectedCity}
                handleFormSubmit={handleFormSubmit}
                handleEmailChange={handleEmailChange}
                handlePhoneChange={handlePhoneChange}
                office_name={office_name}
                setOffice_name={setOffice_name}
                addressLine1={addressLine1}
                setAddressLine1={setAddressLine1}
                addressLine2={addressLine2}
                setAddressLine2={setAddressLine2}
                poc_email={poc_email}
                setPoc_email={setPoc_email}
                poc_contact={poc_contact}
                setPoc_contact={setPoc_contact}
                poc_name={poc_name}
                setPoc_name={setPoc_name}
                zip_code={zip_code}
                setZip_code={setZip_code}
                isValidEmail={isValidEmail}
                isValidPhone={isValidPhone}
                allFieldsFilled={allFieldsFilled}
              />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddLocation;
