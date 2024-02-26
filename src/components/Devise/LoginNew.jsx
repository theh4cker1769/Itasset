import React, { useEffect, useState } from 'react'
import './LoginNew.css'
import linkedin from '../Assets/linkedin.svg'
import fb from '../Assets/fb.svg'
import whatsApp from '../Assets/whatsApp.svg'
import tracker from '../Assets/tracker.svg'
import logo from '../Assets/logo.svg'
import mail from '../Assets/mail1.svg'
import iso from '../Assets/iso1.svg'
import iso9001 from '../Assets/iso90011.svg'
import iso27001 from '../Assets/iso270011.svg'
import companies from '../Assets/companies1.svg'
import year14 from '../Assets/14year.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'

const LoginNew = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, { email, password })
            .then((response) => {
                if (response.status === 200) {
                    alert("Login Successful");
                    console.log(response.data);
                    localStorage.setItem("authToken", response.data.auth_token);
                    localStorage.setItem("userID", response.data.user_id);
                    localStorage.setItem("companyID", response.data.company_id);
                    window.location.href = "/home";
                }
            })
            .catch((error) => {
                console.error(error);
                setLoginError(true);
            });
    };

    const [countries, setCountries] = useState([])
    const getCountryies = () => {
        axios.get(`https://cylsysapis.cylsys.com/api/v1/getcountry`)
            .then(response => {
                setCountries(response.data.data)
            })
            .catch(error => {
                console.error('Error fetching countries', error)
            })
    }
    useEffect(() => {
        getCountryies()
    }, [])

    const [demoForm, setDemoForm] = useState({ name: '', email: '', phoneNo: '', country: '', specificRequirement: '' })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDemoForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDemoForm = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://cylsysapis.cylsys.com/api/v1/demoRequest/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    application_id: "DIGI",
                    user_name: demoForm.name,
                    email_id: demoForm.email,
                    mobile_no: demoForm.phoneNo,
                    country_id: "0",
                    country_name: demoForm.country,
                    details: demoForm.specificRequirement,
                    created_by: "asma"
                })
            })
            const data = await response.json()
            // console.log(data)
            if (data) {
                alert('Demo request submitted successfully')
            }

        } catch (error) {
            console.error('Error submitting demo request', error)
        }
    }

    return (
        <div className='login-section-itassest'>
            <div class="modal fade" id="requestBtn" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header py-0 justify-content-center">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">
                                <img src="assets/images/digi-card.png" alt="" class="w-25" />
                                Request for a demo
                            </h1>
                        </div>
                        <div class="modal-body">
                            <form class="demo_request_form">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Name</label>
                                    <input type="Text" class="form-control" id="name" aria-describedby="name" placeholder="Enter name"
                                        name='name' value={demoForm.name} onChange={handleInputChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                        placeholder="Enter email" name='email' value={demoForm.email} onChange={handleInputChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Phone no.</label>
                                    <input type="Text" class="form-control" id="phoneNo" aria-describedby="phoneNo"
                                        placeholder="Enter Phone no." name='phoneNo' value={demoForm.phoneNo} onChange={handleInputChange} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Country</label>
                                    <select class="form-select" aria-label="Default select example" name='country' value={demoForm.country} onChange={handleInputChange}>
                                        <option selected>Select Country</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country.country_name}>{country.country_name}</option>

                                        ))}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Any Specific Requirement</label>
                                    <input type="Text" class="form-control" id="" aria-describedby=""
                                        placeholder="Enter Any Specific Requirement" name='specificRequirement' value={demoForm.specificRequirement} onChange={handleInputChange} />
                                </div>

                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">I’m not a robot</label>
                                </div>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                    Close
                                </button>
                                &nbsp;
                                <button type="submit" class="btn btn-success" onClick={handleDemoForm}>
                                    Please Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg_banner">
                <div class="container">
                    <div class="row login">
                        <div class="col-md-8 login-left">
                            <h2 class="pb-2">
                                CYLSYS Tech Tracker Pro <img src={tracker} alt="" />
                            </h2>
                            <h3 class="pb-4">
                                Effortless IT Asset Management Streamlining Inventory for Seamless Operations
                            </h3>
                            <p class="pb-2">
                                Our cutting-edge IT asset inventory software – A comprehensive solution designed to seamlessly handle and
                                optimize the inventory of IT assets within an organization. This powerful tool empowers businesses to
                                effortlessly track, manage, monitor and audit all IT assets in real-time. With intuitive features and a
                                user-friendly interface, our software ensures accurate and up-to-date information on asset location, User,
                                status and other information regarding the asset like warranties and AMC renewal dates.
                            </p>
                            <button type="button" class="btn btn-outline-light requestBtn" data-bs-toggle="modal"
                                data-bs-target="#requestBtn">
                                Request for a demo
                            </button>
                        </div>
                        <div class="col-md-4">
                            <div class="form_card">
                                <div class="card">
                                    <div class="card-header">
                                        <img src={logo} class="cylsys-logo abc1" alt="" />
                                        <div class="digi-logo"><img src="" alt="" /></div>
                                    </div>
                                    <div class="card-body">
                                        <form onSubmit={handleLogin}>
                                            <div class="py-2">
                                                <label for="exampleInputEmail1" class="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    id="exampleInputEmail1"
                                                    className="form-control"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div class="py-2">
                                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    id='exampleInputPassword1'
                                                    placeholder="Password"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div class="req">
                                                <button type='submit' class="btn btn-outline-light loginBtn log">
                                                    Login
                                                </button> &nbsp;
                                                <button type="button" class="btn btn-outline-light requestBtn req-btn" data-bs-toggle="modal"
                                                    data-bs-target="#requestBtn">
                                                    Request for a demo
                                                </button>
                                            </div>
                                            {loginError && (
                                                <p className="error-message">
                                                    Invalid email or password. Please try again.
                                                </p>
                                            )}
                                            <div class="forget_password">
                                                <p>

                                                    <Link to="/forgetpassword" id="Forget">
                                                        Forget Password?
                                                    </Link>
                                                </p>
                                                <p><Link to="/signup">Create an Account ?</Link></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row align-items-center">
                                <div class="col-md-8">
                                    <ul class="list-unstyled p-0 d-flex align-items-center justify-content-around m-0">
                                        <li>
                                            <img src={linkedin} alt="" />

                                            <img src={fb} alt="" class="px-2" />

                                            <img src={whatsApp} alt="" />
                                            +919967502270
                                        </li>
                                        <li>
                                            <img src={mail} alt="" />reachus@cylsys.com
                                        </li>
                                        <li>
                                            <img src={mail} alt="" />sales@cylsys.com
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <ul class="list-unstyled p-0 d-flex align-items-center justify-content-around m-0">
                                        <li>
                                            <img src={year14} alt="" />
                                        </li>
                                        <li>
                                            <img src={iso} alt="" />
                                        </li>
                                        <li>
                                            <img src={companies} alt="" />
                                        </li>
                                        <li>
                                            <img src={iso9001} alt="" />
                                        </li>
                                        <li>
                                            <img src={iso27001} alt="" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginNew