import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const RepairAssignedAssets = () => {
    const userID = localStorage.getItem("userID");
    const companyID = localStorage.getItem("companyID");

    const navigate = useNavigate();
    const params = useParams();

    // Assigned Assets
    const [assignedAssets, setAssignedAssets] = useState();
    const assignedAssetData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/assigned-assets/${params.id}`);
            const data = await response.json();
            setAssignedAssets(data.data);
        } catch (error) {
            console.error("Error fetching assigned assets:", error);
        }
    };
    useEffect(() => {
        assignedAssetData();
    }, []);

    useEffect(() => {
        if (assignedAssets) {
            setFormData({
                selectedAssetId: assignedAssets.assets_id,
                selectedEmployeeId: assignedAssets.emp_id,
            });
        }
    }, [assignedAssets]);

    // Assets
    const [assets, setAssets] = useState([]);
    const assetData = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_BASE_URL + "/api/assets/getdata", {
                params: {
                    user_id: userID,
                    company_id: companyID
                }
            });
            setAssets(response.data.data);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };
    useEffect(() => {
        assetData();
    }, []);

    // Employees
    const [emp, setEmp] = useState();
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


    // Form Data
    const [formData, setFormData] = useState({
        selectedAssetId: "",
        selectedEmployeeId: "",
        repair_description: "",
        repair_date: new Date().toISOString().slice(0, 10),
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // Image 
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


    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataMain = new FormData();
        formDataMain.append('image', selectedImage);

        Object.keys(formData).forEach((key) => {
            formDataMain.append(key, formData[key]);
        });

        formDataMain.append('user_id', userID);
        formDataMain.append('company_id', companyID);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/repair-assets`, {
                method: "POST",
                body: formDataMain
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const responseData = await response.json();
            await handleUpdateRepair(params.id)
            navigate("/repairassets");
        } catch (error) {
            console.error("Error adding asset:", error);
        }

    };

    // Assigned Asset Delete 
    const handleUpdateRepair = async (id) => {
        try {
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/update-repair/${id}`,
             { method: 'PUT' }
            );
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <main id="main" className="main">
            <section className="section">
                <h3>Repair Assigned Asset</h3>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="#">Asset</label>
                        <br />
                        <select
                            className="form-control"
                            value={formData.selectedAssetId}
                            onChange={handleInputChange}
                            name="selectedAssetId"
                            disabled
                        >
                            <option value="">--Choose a User--</option>
                            {assets && assets.map((v) => (
                                <option key={v.serial_number} value={v.serial_number}>
                                    {v.asset_name}
                                </option>
                            ))
                            }
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="#">Assign To</label>
                        <br />
                        <select
                            className="form-control"
                            value={formData.selectedEmployeeId}
                            onChange={handleInputChange}
                            name="selectedEmployeeId"
                            disabled
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

                    <div className="col-md-3">
                        <label htmlFor="">Upload Image</label>
                        <input type="file" accept="image/*" id="fileInput" onChange={handleImageChange} />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="">Assign Date</label>
                        <input type="date" className="form-control" name="repair_date" id="assign_date"
                            value={formData.repair_date} onChange={handleInputChange} />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="#">Description</label>
                        <br />
                        <textarea name="repair_description" id="" className="form-control" cols="30" rows="5"
                            value={formData.repair_description} onChange={handleInputChange}></textarea>
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

                <div className="row">
                    <Link to="/assignlist">
                        <button className="btn btn-primary sub" onClick={handleSubmit}>
                            Update
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default RepairAssignedAssets