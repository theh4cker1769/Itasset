import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form';
import { NavLink, useParams } from 'react-router-dom'

const ViewAssignAsset = () => {

    const [emp, setEmp] = useState();
    const userID = localStorage.getItem("userID");
    const companyID = localStorage.getItem("companyID");
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

    const [formData, setFormData] = useState({})
    const [imagePreview, setImagePreview] = useState(null);
    const fetchAssignAsset = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/viewassignasset/${params.id}`);
            const data = await response.json();
            setFormData(data.data)
            setImagePreview(data.image)
        } catch (error) {
            console.error("Error fetching asset purchase data:", error);
        }
    }

    useEffect(() => {
        employedata();
        fetchAssignAsset();
    }, [])


    return (
        <main id="main" className="main">
            <section className="section">

                <div className="row">

                    <div className="col-md-4">
                        <label htmlFor="#">Assign To</label>
                        <br />
                        <select
                            className="form-control"
                            value={formData.employee_id}
                            name="selectedEmployeeId"
                            disabled
                        >
                            <option value="">--Choose a User--</option>
                            {emp && emp.map((emp) => (
                                <option key={emp.employee_id} value={emp.employee_id}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                    </div>



                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="#">Description</label>
                        <br />
                        <textarea name="assign_description" className="form-control" cols="30" rows="5"
                            value={formData.assign_description}></textarea>
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
                    <NavLink to="/Addlist">
                        <button className="btn btn-primary sub">
                            Back
                        </button>
                    </NavLink>
                </div>
            </section>
        </main>
    )
}

export default ViewAssignAsset