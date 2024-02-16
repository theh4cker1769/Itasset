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
  // const [prodCategory, setProdCategory] = useState();
  // const [productType, setProductType] = useState();
  // const [product, setProduct] = useState();
  // const [vendor, setVendor] = useState();
  // const [assetName, setAssetName] = useState();
  // const [department, setDepartment] = useState();
  // const [address, setAddress] = useState("");
  const [emp, setEmp] = useState();
  // const [description, setDescription] = useState("");
  // const [assigncomponent, setAssigncomponent] = useState("");
  // const [selectedAssetId, setSelectedAssetId] = useState();
  // const [selectedproductTypeId, setSelectedproductTypeId] = useState();
  // const [selectedDepartmentId, setSelectedDepartmentId] = useState();
  // const [selectedproductCategoryId, setSelectedproductCategory] = useState();
  // const [selectedproductId, setSelectedproductId] = useState();
  // const [selectedVendorId, setSelectedVendorId] = useState();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();
  const navigate = useNavigate();
  const params = useParams();

  // const vendordata = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/vendors`);
  //     const data = await response.json();
  //     setVendor(data.vendors);
  //   } catch (error) {
  //     console.error("Error fetching vendors:", error);
  //   }
  // };

  // const producttypedata = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/producttype`);
  //     const data = await response.json();
  //     setProductType(data.data);
  //   } catch (error) {
  //     console.error("Error fetching vendors:", error);
  //   }
  // };

  // const Assetdata = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/assets/2`);
  //     const data = await response.json()
  //     setAssetName(data.data);
  //   } catch (error) {
  //     console.error("Error fetching vendors:", error);
  //   }
  // };

  // const procuctcatogrydata = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/productCategory`);
  //     const data = await response.json();
  //     setProdCategory(data.data);
  //   } catch (error) {
  //     console.error("Error fetching vendors:", error);
  //   }
  // };

  const employedata = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getdata_employees?user_id=${userID}&company_id=${companyID}`);
      const data = await response.json();
      setEmp(data.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  // const departmentdata = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/departments`);
  //     const data = await response.json();
  //     setDepartment(data);
  //   } catch (error) {
  //     console.error("Error fetching vendors:", error);
  //   }
  // };

  // const productdata = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/product-data`);
  //     const data = await response.json();
  //     setProduct(data.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  useEffect(() => {
    // vendordata();
    // productdata();
    // departmentdata();
    employedata();
    // procuctcatogrydata();
    // Assetdata();
    // producttypedata();
  }, []);

  // console.log(selectedEmployeeId)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/assets/employee/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employee_id: selectedEmployeeId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAssignAsset([...assignAsset, data]);
      setSelectedEmployeeId("");
      navigate("/addlist");
    } catch (error) {
      console.error("Error adding asset:", error);
    }

  };

  return (
    <>
      <main id="main" className="main">
        <section className="section">
          {/* ... (main section content) */}

          {/* <div className="row">
              <ProductCategoryDropdown
                prodCategory={prodCategory}
                selectedproductCategoryId={selectedproductCategoryId}
                setSelectedproductCategory={setSelectedproductCategory}
              />
  
              <ProductTypeDropdown
                productType={productType}
                selectedproductTypeId={selectedproductTypeId}
                setSelectedproductTypeId={setSelectedproductTypeId}
              />
  
              <ProductDropdown
                product={product}
                selectedproductId={selectedproductId}
                setSelectedproductId={setSelectedproductId}
              />
  
              <VendorDropdown
                vendor={vendor}
                selectedVendorId={selectedVendorId}
                setSelectedVendorId={setSelectedVendorId}
              />
            </div> */}

          <br />

          <div className="row">
            {/* <AddressInput
                address={address}
                setAddress={setAddress}
              />
  
              <AssetDropdown
                assetName={assetName}
                selectedAssetId={selectedAssetId}
                setSelectedAssetId={setSelectedAssetId}
              />
  
              <DepartmentDropdown
                department={department}
                selectedDepartmentId={selectedDepartmentId}
                setSelectedDepartmentId={setSelectedDepartmentId}
              /> */}

            <div className="col-md-3">
              <label htmlFor="#">Assign To</label>
              <br />
              <select
                className="form-control"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
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
          </div>

          {/* <br />
  
            <div className="row">
              <DescriptionInput
                description={description}
                setDescription={setDescription}
              />
  
              <AssignComponentInput
                assigncomponent={assigncomponent}
                setAssigncomponent={setAssigncomponent}
              />
  
              
            </div> */}
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