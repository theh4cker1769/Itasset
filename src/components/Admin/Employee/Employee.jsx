import React, { useState, useEffect } from "react";
import "../Employee/Employee.css";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Employee = ({ sidebarOpen }) => {
  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");

  const [data, setData] = useState([]);
  const [status, setStatus] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsperPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getdata_employees?user_id=${userID}&company_id=${companyID}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const jsonData = await response.json();
      setData(jsonData.data);
      console.log(data, "data");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = () => {
    return data.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // For Loaction
  const [locations, setLocations] = useState([]);
  const fetchLocation = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/get-locations?user_id=${userID}&company_id=${companyID}`);
      const data = await response.json();
      // console.log(data.data, "locations");
      setLocations(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLocation = (id) => {
    const location = locations.find((location) => location.location_id == id);
    return location ? location.office_name : "Unknown";
  };

  // For Department
  const [department, setDepartment] = useState([]);
  const fetchDeparment = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/data_departments?user_id=${userID}&company_id=${companyID}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const jsonData = await response.json();
      console.log(jsonData.data, "data");
      setDepartment(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const getDepartment = (id) => {
    const dept = department.find((dept) => dept.department_id == id);
    return dept ? dept.department_name : "Unknown";
  };

  useEffect(() => {
    fetchDeparment();
    fetchLocation();
  }, [])


  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/employees/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );
      if (response.ok) {
        setData((prevData) =>
          prevData.map((item) =>
            item.employee_id === id ? { ...item, status: newStatus } : item
          )
        );
      } else {
        console.error("Error updating data:", response);
      }
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData().slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/employees/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.employee_id !== itemId));
      } else {
      }
    } catch (error) { }
    window.location.reload();
  };

  const downloadExcel = () => {

    const filteredData = currentItems.map(item => ({
      "Employee ID": item.employee_id,
      "Name": item.name,
      "Email": item.email,
      "Contact Number": item.phone,
      "Location": item.location
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
    <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
      <div className="card" id="Employee-card">
        <section>
          <h4>Employee</h4>
          <hr />
          <div className="row">
            <div className="col-md-12 d-flex gap-2">
              <Link to="/AddEmployee" className="btn btn-primary" id="btn-vendor" >Add Employee</Link>
              <button className="btn btn-dark btn-vendor" onClick={downloadExcel}>
                Export
              </button>
            </div>
          </div>

          <div className="col-sm-6 col-md-4 col-12" id="search">
            <div className="input-group rounded blue">
              <input type="search" className="form-control rounded" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <span className="input-group-text border-0 blue" id="search-addon"> <i className="fas fa-search" /></span>
            </div>
          </div>

          <div className="col-md-12" id="show-entries">
            <span className="entry_show">Show</span>
            <select className="custom-select custom-select-sm form-control form-control-sm" id="show-select" value={itemsPerPage}
              onChange={(e) => setItemsperPage(e.target.value)}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <span className="entry_show">entries</span>
          </div>

          <div className="row row1">
            <div className="col-sm-12">
              <table className="checkbox-datatable table nowrap dataTable no-footer dtr-inline">
                <thead>
                  <tr role="row" className="lightblue">
                    <th className="dt-body-center sorting_disabled"><input type="checkbox" /></th>
                    <th className="sorting_desc ">S.No</th>
                    <th className="sorting">Employee ID </th>
                    <th className="sorting">Name</th>
                    <th className="sorting">Email</th>
                    <th className="sorting">Designation</th>
                    <th className="sorting" >Contact Number</th>
                    <th className="sorting" >Location</th>
                    <th className="sorting"> Department</th>
                    <th className="sorting"> Status</th>
                    <th className="sorting">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr role="row" className="odd" key={item.id}>
                      <td className=" dt-body-center"><input type="checkbox" name="id[]" defaultValue /></td>
                      <td>{index + 1}</td>
                      <td>{item.employee_id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.designation}</td>
                      <td>{item.phone}</td>
                      <td>{getLocation(item.location)}</td>
                      <td>{getDepartment(item.department_id)}</td>
                      <td>
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" value={status} id={`flexSwitchCheckChecked-${item.id}`} defaultChecked={item.is_active} onChange={(e) => updateStatus(item.employee_id, e.target.checked)} />
                        </div>
                      </td>
                      <td>
                        <Link to={`/Employees/${item.employee_id}`} id="edit-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </Link>
                        &nbsp;&nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                          onClick={() => handleDelete(item.employee_id)}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row mt-3">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
              </li>
              {Array.from({
                length: Math.ceil(filterData().length / itemsPerPage)
              }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)} >{index + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === Math.ceil(filterData().length / itemsPerPage) ? "disabled" : ""}`} >
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filterData().length / itemsPerPage)}>
                  Next
                </button>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Employee;