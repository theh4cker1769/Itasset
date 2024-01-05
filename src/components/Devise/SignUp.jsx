import React, { useState } from "react";
import "./SignUp.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import logo from "../Assets/Cylsys.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [country_code, setCountryCode] = useState("91");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [agreedToTermsError, setAgreedToTermsError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleSignUp = () => {
    

    if (!username || !email || !password || !confirm_password || !phone || !agreedToTerms) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }
    if (email.endsWith("gmail.com") || email.endsWith("yahoo.com")) {
      alert("Email addresses from Gmail and Yahoo! domains are not allowed.");
      return;
    }

    const registrationData = {
      username,
      email,
      password,
      phone,
      country_code,
      agreedToTerms,
    };

    axios
      .post("http://localhost:5000/api/register", registrationData)

      .then((response) => {
        toast('Sign-up successful !!!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: toastClosed()
        });
        
        console.log("Sign-up successful:", response);
        
      })
      .catch((error) => {
        alert("Error while signing up", error);
        console.error("Sign-up failed:", error);
      });
  };

  const toastClosed = () => {
    setTimeout(()=> {
      navigate("/Login")
    }, 2000)
  }

  const handleFullNameChange = (e) => {
    setUserName(e.target.value);
    if (!e.target.value) {
      setFullNameError("Full Name is required");
    } else {
      setFullNameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setEmailError("Email is required");
    } else if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordPattern = /^(?!.*\s).{6,}$/;

    if (!passwordPattern.test(newPassword)) {
      setPasswordError(
        "Password must be at least 6 characters long and should not contain spaces"
      );
    } else {
      const distinctChars = new Set(newPassword).size;
      if (distinctChars < 3) {
        setPasswordError(
          "Password must contain at least 3 distinct characters"
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowPassword1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };

  const handleConfirmPasswordChange1 = (e) => {
    setConfirmPassword(e.target.value);
    if (!e.target.value) {
      setConfirmPasswordError("Confirm Password is required");
    } else if (e.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePhoneNumberChange = (event) => {
    const newValue = event.target.value;

    if (newValue === '' || /^\d+$/.test(newValue)) {
      if (newValue.length <= 8) {
        setPhoneNumber(newValue);
        setPhoneNumberError("Phone Number is required");
      } else {
        setPhoneNumber(newValue);
        setPhoneNumberError("");
      }
    } else {
      setPhoneNumberError("");
    }

  };

  const handleAgreedToTermsChange = (e) => {
    setAgreedToTerms(e.target.checked);
    if (!e.target.checked) {
      setAgreedToTermsError("You must agree to the terms");
    } else {
      setAgreedToTermsError("");
    }
  };

  const handleCountryCodeChange = (value) => {
    setCountryCode(value)
  };


  return (
    <section className="signup-section">
      <div className="text-center">
        <img src={logo} alt="Logo" className="mt-4" />
      </div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6" id="card-main">
            <div className="card mt-0">
              <div className="card-header text-center register" id="register">
                <h3 className="h3_registration">Registration Form</h3>
              </div>
              <div className="card-body p-4">
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Full Name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Full Name"
                    value={username}
                    onChange={handleFullNameChange}
                  />
                  {fullNameError && (
                    <div className="error text-danger">{fullNameError}</div>
                  )}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email <span className="star">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {emailError && (
                      <div className="error text-danger">{emailError}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Password <span className="star">*</span>
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="input form-control"
                        id=""
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      {passwordError && (
                        <div className="error text-danger">{passwordError}</div>
                      )}
                      <div
                        className="password-icon"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Confirm Password<span className="star">*</span>
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showPassword1 ? "text" : "password"}
                        className="form-control"
                        id=""
                        placeholder="Confirm Password"
                        value={confirm_password}
                        onChange={handleConfirmPasswordChange1}
                      />
                      {confirmPasswordError && (
                        <div className="error text-danger">
                          {confirmPasswordError}
                        </div>
                      )}
                      <div
                        className="password-icon"
                        onClick={handleShowPassword1}
                      >
                        {showPassword1 ? <RiEyeOffFill /> : <RiEyeFill />}
                      </div>
                    </div>
                  </div>
                  <div className="phone-number-field mb-3">
                    <label htmlFor="" className="form-label">
                      Phone Number <span className="star">*</span>
                    </label>
                    <div className="phone-number-field-container">
                      <PhoneInput
                        inputStyle={{ width: "100%" }}
                        country={"in"}
                        value={country_code}
                        onChange={handleCountryCodeChange}
                        placeholder="Phone Number"
                      />
                      <input type="tel" className="form-control" placeholder="Phone Number" value={phone}
                        onChange={handlePhoneNumberChange} />
                    </div>
                    {phoneNumberError && (
                      <div className="error text-danger">
                        {phoneNumberError}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 form-check text-center">
                    <input
                      type="checkbox"
                      className="form-check-input mt-3"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={handleAgreedToTermsChange}
                    />

                    <label className="form-check-label" htmlFor="terms">
                      I agree to the terms of service and privacy policy.{" "}
                      <span className="star">*</span>
                    </label>
                    {agreedToTermsError && (
                      <div className="error text-danger">
                        {agreedToTermsError}
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-primary col-12"
                    onClick={handleSignUp}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
export default SignUp;
