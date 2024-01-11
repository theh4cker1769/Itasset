import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


const Edit_Form = () => {
  const [vendor, setVendors] = useState([]);
  const [vendardata, setVendorData] = useState([]);
  const [vendor_name, setVendorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [zip_code, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    fetchData("https://apis.itassetmgt.com:8443/api/v1/countries", setCountries);
    fetchData("https://apis.itassetmgt.com:8443/api/v1/states", setStates);
    fetchData("https://apis.itassetmgt.com:8443/api/v1/cities", setCities);
    fetchData(`https://apis.itassetmgt.com:8443/api/v1/vendors/${params.id}`, setVendorData);
  }, [params.id]);

  const fetchVendors = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/api/vendors");
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/vendors/GetVendorById/${params.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const vendorData = await response.json();
        console.log("vendorData", vendorData.data);
        setVendors(vendorData.data)
        setVendorName(vendorData.data.vendor_name);
        setEmail(vendorData.data.email);
        setPhoneNumber(vendorData.data.phone);
        setSelectedCountry(vendorData.data.country);
        setSelectedState(vendorData.data.state);
        setSelectedCity(vendorData.data.city);
        setZipCode(vendorData.data.zip_code);
        setAddress(vendorData.data.address);
        setDescription(vendorData.data.description);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, [params.id]);

  const updateVendor = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/vendors/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendor_name: vendor_name,
          email: email,
          phone: phone_number,
          country: selectedCountry,
          state: selectedState,
          city: selectedCity,
          zip_code: zip_code,
          address: address,
          description: description,
          user_id: 2,
          company_id: 1
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      console.log("vendor updated successfully");
      navigate("/vendor");
    } catch (error) {
      console.error("Error updating vendor data:", error);
    }
  };

  return {
    vendor_name,
    setVendorName,
    email,
    setEmail,
    phone_number,
    setPhoneNumber,
    countries,
    states,
    cities,
    zip_code,
    setZipCode,
    address,
    setAddress,
    description,
    setDescription,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    updateVendor
  };
};

export default Edit_Form;