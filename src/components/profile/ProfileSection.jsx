import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ProfileSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faPhone, faEnvelope, faUserPlus, faChartSimple, faLocationDot, faUser, faShareAlt, } from "@fortawesome/free-solid-svg-icons";
import adminImage from "../Assets/admin1.jpg";
import { Link } from "react-router-dom";
import ProfileSecondSection from "./ProfileSecondSection";
const ProfileSection = ({ sidebarOpen }) => {

  const [adminData, setAdminData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState("");
  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");

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


  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    const uploadedFile = await event.target.files[0];
    setSelectedImage(uploadedFile);
    console.log('Uploaded file:', uploadedFile.name, 'Size:', uploadedFile.size);
  };

  useEffect(() => {
    if (selectedImage) {
      profileUpload();
    }
  }, [selectedImage]);

  //  Profile Image Upload
  const profileUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('user_id', userID);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/insertImgProfile`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('File upload success:', data);
    } catch (error) {
      console.error('File upload error:', error);
    }
  }

  // profileImage
  const [adminImageFetch, setAdminImageFetch] = useState();
  const profileImage = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getImgProfile?user_id=${userID}`);
      console.log('Profile Image:', response.data.data);
      setAdminImageFetch(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    profileImage();
  }, []);

  return (
    <>
      <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`} >
        <section className="section m-3">
          <h4>
            <b>Profile</b>
          </h4>
          <hr />
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <input type="file" accept="image/*" id="fileInput" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileUpload} />
                  {adminImageFetch ?
                    <img src={adminImageFetch} alt="Admin Avatar" style={{ width: "100%" }} />
                    :
                    <img src={adminImage} alt="Admin Avatar" style={{ cursor: 'pointer', width: "100%" }} onClick={triggerFileInput} />
                  }
                  <div className="delete-icon">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </div>
                  <h5>Contact</h5>
                  <ul className="contectIcon">
                    <li>
                      <FontAwesomeIcon icon={faPhone} className="mr-3 icon" />
                      {adminData.phone_number_var}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faEnvelope} className="icon" />
                      {adminData.email_var}
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faUserPlus} className="icon" />
                      <Link >
                        <b>Refer A Friend</b>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <ProfileSecondSection />
              <br />
              <div className="third">
                <div className="summarydata">
                  <h6>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <b>Basic information</b>
                  </h6>
                  <FontAwesomeIcon icon={faPen} className="penIcon" />
                </div>
                <div className="tab flex" style={{ marginLeft: "40px" }}>
                  <table>
                    <tbody>
                      <tr>
                        <tr>
                          <th>Full name</th>
                          <td>{adminData.username_var}</td>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <td>{adminData.email_var}</td>
                        </tr>
                        <tr>
                          <th>Contact No.</th>
                          <td>{adminData.phone_number_var}</td>
                        </tr>
                        <tr>
                          <th>Designation</th>
                          <td>Admin</td>
                        </tr>
                        <tr>
                          <th>Responsibilities</th>
                          <td>
                            Admin has access to - Assign IT Manager/IT
                            Executives, Add Locations
                          </td>
                        </tr>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <br /><div className="third">
                <div className="summarydata">
                  <h6>
                    <FontAwesomeIcon icon={faPhone} className="mr-3 icon" />
                    <b>Company information</b>
                  </h6>
                  <FontAwesomeIcon icon={faPen} className="penIcon" />
                </div>
                <div className="tab" style={{ marginLeft: "40px" }}>
                  <table>
                    <tbody>
                      <tr>
                        <tr>
                          <th>Company Name</th>
                          &nbsp;
                          <td>{adminData.company_name_var}</td>
                        </tr>
                      </tr>
                      <tr>
                        <tr>
                          <th>No of Employees</th>
                          <td>{adminData.number_of_employees_var}</td>
                        </tr>
                        <tr>
                          <th>Company Email</th>
                          <td>{adminData.company_email_var}</td>
                        </tr>
                        <tr>
                          <th>Company Phone</th>
                          <td>{adminData.contact_number_var}</td>
                        </tr>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              {/* <div className="third">
                <div className="summarydata">
                  <h6>
                    <FontAwesomeIcon icon={faShareAlt} className="icon" />
                    <b>Social Media Information</b>
                  </h6>
                  <FontAwesomeIcon icon={faPen} className="penIcon" />
                </div>
              </div>
              <div className="tab" style={{ marginLeft: "40px" }}>
                <table>
                  <tbody>
                    <tr>
                      <th>Facebook</th>
                      <td>{adminData.name}.@facebook</td>
                    </tr>
                    <tr>
                      <th>Twitter</th>
                      <td>{adminData.name}.@twitter</td>
                    </tr>
                    <tr>
                      <th>LinkedIn</th>
                      <td>{adminData.name}.@linkedin</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default ProfileSection;
