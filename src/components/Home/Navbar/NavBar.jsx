import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../Assets/Cylsys.png";
import profile from "../../Assets/admin1.jpg";
import "./Navbar.css";
import SideBar from "../Sidebar/SideBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminData, setAdminData] = useState({});
  const [error, setError] = useState(null);
  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("companyID");

    window.location.href = "/login";
    // try {
    //   const response = await fetch("https://apis.itassetmgt.com:8443/api/v1/logout", {
    //     method: "DELETE",
    //     credentials: "include",
    //     mode: "cors", // Add this line to explicitly specify CORS mode
    //     headers: {
    //       "Content-Type": "application/json", // Add this line to set the content type
    //     },
    //   });
    //   if (response.ok) {
    //     console.log("Logout successful");
    //     localStorage.setItem("authToken", "");
    //     window.location.href = "/login";
    //   } else {
    //     console.error("Logout failed");
    //   }
    // } catch (error) {
    //   console.error("Logout error:", error);
    // }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("Authentication token not found in local storage.");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getprofile/${userID}/${companyID}`, {
          headers: {
            Authorization: authToken,
          },
        });
        // console.log(response.data.data);
        setAdminData(response.data.data);
        // setCompanyData(response.data.company);
      } catch (error) {
        setError("Error fetching data.");
      }
    };
    fetchData();
  }, []);



  // profileImage
  const [adminImageFetch, setAdminImageFetch] = useState();
  const profileImage = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getImgProfile?user_id=${userID}`);
      setAdminImageFetch(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    profileImage();
  }, []);


  return (
    <div className={`header-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div className="container-fluid fixed-top shadow-sm bg-white" id="nav-container-fluid">
        <div className="row">
          <div className="col-md-3 d-flex justify-content-between" id="nav_main">
            <div><Link to="/Home">
              <img src={logo} alt="images" className="logo-img w-100 m-0" /></Link>
            </div>
            <div><i className="fa-solid fa-bars" id="menu_icon_navbar" onClick={handleSidebarToggle} /></div>
          </div>
          <div className="col-md-2 " />
          <div className="col-md-7  p-0">
            <ul className="m-0" id="ul-navbar">

              <li>
                <a href="/profile">
                  {adminImageFetch ?
                    <img src={adminImageFetch} alt="Admin Avatar" className="header-img"/>
                    :
                    <img src={profile} alt="Admin Avatar" style={{ cursor: 'pointer', width: "100%" }} />
                  }
                </a>
              </li>
              <li> <div className="bell_icon_navbar"> <i className="fa-solid fa-bell" id="bell-nav"></i></div></li>
              <li>
                <div><p className="logout-navbar">
                  <li className="nav-item dropdown pe-4 list-inline">
                    <Link className="nav-link dropdown-toggle text-black small" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                      <span className="userclr"> {adminData.username_var} </span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile" id="dropdown-logout">
                      <li><Link className="dropdown-item d-flex align-items-center" href="#" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>
                        <span>Logout</span>
                      </Link>
                      </li>
                    </ul>
                  </li>
                </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SideBar isOpen={sidebarOpen} />
    </div>
  );
};
export default Navbar;
