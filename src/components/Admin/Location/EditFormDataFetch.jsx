import React, { useEffect } from "react";

const LocationDataFetch = ({
  params,
  setData,
  setId,
  setOffice_name,
  setPoc_email,
  setPoc_contact,
  setPoc_name,
  setAddressLine1,
  setAddressLine2,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  setZip_code,
}) => {
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/locations/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const locationData = await response.json();
        setData(locationData.location);
        
        setId(locationData.location.location_id);
        setOffice_name(locationData.location.office_name);
        setAddressLine1(locationData.location.address_line_1);
        setAddressLine2(locationData.location.address_line_2);
        setPoc_email(locationData.location.contact_person_email);
        setPoc_contact(locationData.location.contact_person_phone);
        setPoc_name(locationData.location.contact_person_name);
        setZip_code(locationData.location.zip_code);
        setSelectedCountry(locationData.location.country);
        console.log(locationData.location.country);
        setSelectedState(locationData.location.state_province);
        setSelectedCity(locationData.location.city);
      } catch (error) {}
    };
    fetchLocationData();
  }, [params.id]);

  return null;
};

export default LocationDataFetch;
