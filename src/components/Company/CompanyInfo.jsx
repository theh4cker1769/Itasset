import React, { useState } from "react";
import CountrySelect from "../../countryDetails/Country";
import StateSelect from '../../countryDetails/State';
import CitySelect from "../../countryDetails/City";
import { useNavigate } from "react-router-dom";
import "../Company/CompanyInfo.css";
import Logo from "../Assets/Cylsys.png";


const CompanyInfo = () => {
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [company, setCompany] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [portal_name, setPortal] = useState("");
  const [industry, setIndustry] = useState("");
  const [number_of_employees, setNumberOfEmployee] = useState("");
  const [tax_information, setTax] = useState("");
  const [logo, setLogo] = useState("");
  const [pin_code, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const url = `${process.env.REACT_APP_API_BASE_URL}/api/company`;

  const handleCountrySelect = (countryId) => {
    setSelectedCountryId(countryId);
    setSelectedStateId("");
    setSelectedCityId("");
  };

  const handleStateSelect = (stateId) => {
    setSelectedStateId(stateId);
    setSelectedCityId("");
  };

  const handleCitySelect = (cityId) => {
    setSelectedCityId(cityId);
  };

  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const domain = email.split('@')[1];
    const formData = {
      company_name: name,
      company_email: email,
      contact_number: contact_number,
      portal_name: portal_name,
      industry: industry,
      number_of_employees: number_of_employees,
      tax_information: tax_information,
      company_logo: logo,
      country: selectedCountry,
      state_province: selectedState,
      city: selectedCity,
      domain: domain,
      zip_pin_code: pin_code,
    };

    

    // await domainStore(domain)
    await registerComapny(formData)

    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({ company: formData }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     window.location.href = "/home";
    //     return response.json();
    //   })
    //   .then(() => {
    //     setCompany([...company, formData]);
    //     setName("");
    //     setEmail("");
    //     setContactNumber("");
    //     setPortal("");
    //     setIndustry("");
    //     setNumberOfEmployee("");
    //     setTax("");
    //     setLogo("");
    //     setSelectedCountryId("");
    //     setSelectedStateId("");
    //     setSelectedCityId("");
    //     setPincode("");
    //     setAddress("");
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //     console.log("Server response:", error.response);
    //   });
  };

  const registerComapny = async (formData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (data) {
        setCompany([...company, formData]);
        setName("");
        setEmail("");
        setContactNumber("");
        setPortal("");
        setIndustry("");
        setNumberOfEmployee("");
        setTax("");
        setLogo("");
        setSelectedCountryId("");
        setSelectedStateId("");
        setSelectedCityId("");
        setPincode("");
        setAddress("");
        navigate('/signup')
      }
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("Server response:", error.response);
    }

  }

  // const domainStore = async (domain) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/domainInsert`, {
  //       method: "POST",
  //       body: JSON.stringify({ domain }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  

  return (
    <>
      <div className="container-fluid d-flex justify-content-center pt-5" id="company-div">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <img src={Logo} alt="Company Logo" />
          </div>
          <div className="col-md-12 mt-5">
            <div className="card m-lg-auto" id="main-card">
              <div className="text-center h3">Company Information</div>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <label>
                    Company Name<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder="Company Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>
                    Company Email<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id=""
                    placeholder="Company Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>
                    Contact Number<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Contact Number"
                    id=""
                    value={contact_number}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>
                    Portal Name<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder="Portal Name"
                    value={portal_name}
                    onChange={(e) => setPortal(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>
                    Industry<span style={{ color: "red" }}> *</span>
                  </label>
                  <select
                    className="form-control"
                    id=""
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option>Select Industry</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="BPO">BPO</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label>
                    Number of Employee<span style={{ color: "red" }}> *</span>
                  </label>
                  <select
                    className="form-control"
                    id=""
                    value={number_of_employees}
                    onChange={(e) => setNumberOfEmployee(e.target.value)}
                  >
                    <option>Select Here</option>
                    <option value="1-50">1-50</option>
                    <option value="50-100">50-100</option>
                    <option value="100-200">100-200</option>
                    <option value="500-1000">500-1000</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Tax Information</label>
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder="Tax Information"
                    value={tax_information}
                    onChange={(e) => setTax(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>Company Logo</label>
                  <input
                    className="form-control"
                    type="file"
                    id=""
                    placeholder="Company Logo"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">

                <div className="col-md-6">
                  <label>Country<span style={{ color: "red" }}> *</span></label>
                  <CountrySelect onSelectCountry={setSelectedCountry} />
                </div>
                <div className="col-md-6">
                  <label>State/Province</label>
                  <StateSelect
                    selectedCountryId={selectedCountry}
                    onSelectState={setSelectedState}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>City<span style={{ color: "red" }}> *</span></label>
                  <CitySelect
                    selectedCountryId={selectedCountry}
                    selectedStateId={selectedState}
                    onSelectCity={setSelectedCity}
                  />
                </div>

                <div className="col-md-6">
                  <label>
                    ZIP/PIN Code<span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder="ZIP/PIN Code"
                    value={pin_code}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Street Address</label>
                  <textarea
                    className="form-control"
                    type="text"
                    placeholder="Street Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <br />
              <button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={handleFormSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
