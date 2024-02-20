import React, { useState, useEffect } from "react";
import DepartmentList from "./DepartmentList";
import Pagination from "./Pagination";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Department = ({ sidebarOpen }) => {
  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/data_departments?user_id=${userID}&company_id=${companyID}`);
      const data = await response.json();
      console.log("Department Data:", data.data);
      setData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirm = (itemId) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(itemId)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/departments/${itemId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleStatusToggle = async (itemId, newStatus) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/departments/status/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status: newStatus })
        }
      );
      if (response.ok) {
        setData((prevData) =>
          prevData.map((item) =>
            item.department_id === itemId
              ? {
                ...item,
                status: newStatus
              }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const downloadExcel = () => {

    const filteredData = data.map(item => ({
      "Department Name": item.department_name,
      "Contact Person Name": item.contact_person_name,
      "Contact Person Email": item.contact_person_email,
      "Contact Person Phone": item.contact_person_phone,
    }));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the filtered JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convert the buffer to a Blob
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    // Use FileSaver to save the file
    saveAs(blob, 'Data.xlsx');
  }

  return (
    <>
      <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
        <div className="container-fluid">
          <div className="card" id="location-main">
            <main className="department-main">
              <section>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="title">
                      <h4>Department</h4>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex gap-2">
                  <a href="/adddeparment" className="btn btn-primary divclr">
                    <span className="btnn">Add Department</span>
                  </a>
                  <button className="btn btn-dark btn-vendor" onClick={downloadExcel}>
                    Export
                  </button>
                </div>
                <div
                  className="col-12"
                  style={{
                    float: "right",
                    justifySelf: "end",
                    marginLeft: "18rem"
                  }}
                >
                  <DepartmentList
                    data={data}
                    handleDelete={confirm}
                    handleStatusToggle={handleStatusToggle}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                  <Pagination />
                </div>
              </section>
            </main>
          </div>
        </div>
      </main>
    </>
  );
};

export default Department;
