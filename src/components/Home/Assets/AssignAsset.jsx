import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductCategoryDropdown from "./ProductCategoryDropdownAssignAssets";
import ProductTypeDropdown from "./ProductTypeDropdownAssignAssets";
import ProductDropdown from "./ProductDropdownAssignAssets";
import VendorDropdown from "./VendorDropdownAssignAssets";
import AddressInput from "./AddressInputAssignAssets";
import AssetDropdown from "./AssetDropdownAssignAssets";
import DepartmentDropdown from "./DepartmentDropdownAssignAssets";
import EmployeeDropdown from "./EmployeeDropdownAssignAssets";
import DescriptionInput from "./DescriptionInputAssignAssets";
import AssignComponentInput from "./AssignComponentInputAssignAssets";

function AssignAsset() {
  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");

  const [assignAsset, setAssignAsset] = useState([]);
  const [emp, setEmp] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const employedata = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getdata_employees?user_id=${userID}&company_id=${companyID}`);
      const data = await response.json();
      setEmp(data.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    employedata();
  }, []);

  const [formData, setFormData] = useState({
    selectedEmployeeId: "",
    assign_description: "",
    assign_date: new Date().toISOString().slice(0,10),
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataMain = new FormData();
    formDataMain.append('image', selectedImage);

    Object.keys(formData).forEach((key) => {
      formDataMain.append(key, formData[key]);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/assets/employee/${params.id}`, {
        method: "PUT",
        body: formDataMain
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setAssignAsset([...assignAsset, responseData]);
      navigate("/addlist");
    } catch (error) {
      console.error("Error adding asset:", error);
    }

  };

  return (
    <>
      <main id="main" className="main">
        <section className="section">

          <div className="row">

            <div className="col-md-4">
              <label htmlFor="#">Assign To</label>
              <br />
              <select
                className="form-control"
                value={formData.selectedEmployeeId}
                onChange={handleInputChange}
                name="selectedEmployeeId"
              >
                <option value="">--Choose a User--</option>
                {emp && emp.map((emp) => (
                  <option key={emp.employee_id} value={emp.employee_id}>
                    {emp.name}
                  </option>
                ))
                }
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="">Upload Image</label>
              <input type="file" accept="image/*" id="fileInput" onChange={handleImageChange} />
            </div>

            <div className="col-md-4">
              <label htmlFor="">Assign Date</label>
              <input type="date" className="form-control" name="assign_date" id="assign_date"
                value={formData.assign_date} onChange={handleInputChange} />
            </div>

          </div>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="#">Description</label>
              <br />
              <textarea name="assign_description" id="" className="form-control" cols="30" rows="5"
                value={formData.assign_description} onChange={handleInputChange}></textarea>
            </div>
            <div className="col-md-4">
              {imagePreview && (
                <div>
                  <p>Image Preview:</p>
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
              )}
            </div>
          </div>

          <div>
            <Link to="/assignlist">
              <button className="btn btn-primary sub" onClick={handleSubmit}>
                Submit
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default AssignAsset;