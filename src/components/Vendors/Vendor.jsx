import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VendorTable from "./VendorTable";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Vendor = ({ sidebarOpen }) => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + "/api/vendors", {
        params: {
          user_id: localStorage.getItem("userID"),
          company_id: localStorage.getItem("companyID")
        }
      });
      setVendors(response.data.vendors);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleCheckboxChange = (vendorId) => {
    setSelectedVendors((prevSelected) =>
      prevSelected.includes(vendorId)
        ? prevSelected.filter((id) => id !== vendorId)
        : [...prevSelected, vendorId]
    );
  };
  const submit = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteSelected(id)
        },
        {
          label: 'No',
        }
      ]
    });
  }
  const handleDeleteSelected = async (id) => {
    try {
      await Promise.all(
        selectedVendors.map((id) =>
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/vendors/${id}`, {
            method: "DELETE",
          })
        )
      );
      setVendors((prevVendors) =>
        prevVendors.filter((vendor) => !selectedVendors.includes(vendor.vendor_id))
      );
      setSelectedVendors([]);
    } catch (error) {
      console.error(error);
    }
  };
  const confirm = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id)
        },
        {
          label: 'No',
        }
      ]
    });
  }
  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/vendors/${id}`, {
        method: "DELETE",
      });
      setVendors((prevVendors) =>
        prevVendors.filter((vendor) => vendor.vendor_id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id, newStatus) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/vendors/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: newStatus }),
      });
      setVendors((prevVendors) =>
        prevVendors.map((vendor) =>
          vendor.vendor_id === id ? { ...vendor, is_active: newStatus } : vendor
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => setSearchTerm(event.target.value);
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase() === searchTerm.toLowerCase()
  );

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const getContinuousIndex = (index) =>
    (currentPage - 1) * entriesPerPage + index + 1;
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredVendors.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const pageNumbers = Array.from(
    { length: Math.ceil(filteredVendors.length / entriesPerPage) },
    (_, i) => i + 1
  );

  const downloadExcel = () => {

    const filteredData = vendors.map(item => ({
      "Vendor Name": item.vendor_name,
      "Email": item.email,
      "Phone no": item.phone,
      "Description": item.description,
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
    <div
      id="main"
      className={`main-content ${sidebarOpen ? "shift-right" : ""}`}
    >
      <main className="card p-0">
        <section className="section vendors-section">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="title">
                <h4>Vendors</h4>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12 ">
              <button className="btn-vendor mx-2">
                <Link to="/addvendor"
                  className="btn btn-primary"
                  id="AddVendor"
                >
                  Add New Vendor
                </Link>
              </button>
              <button className="btn btn-dark btn-vendor btn-export" onClick={downloadExcel}>
                Export
              </button>
              <button className="btn btn-primary"
                id="delete"
                onClick={submit}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="col-sm-6 col-md-4 col-12"
            style={{ float: "right", justifySelf: "end" }}
          >
            <div className="input-group rounded blue">
              <input type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search" />
              </span>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-md-12 d-flex">
              <span className="entry_show">Show</span>
              <select name="entriesPerPage"
                className="custom-select custom-select-sm form-control form-control-sm"
                style={{ width: "auto" }}
                value={entriesPerPage}
                onChange={handleEntriesPerPageChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="-1">All</option>
              </select>
              <span className="entry_show">entries</span>
            </div>
          </div>
          <div className="dataTables_wrapper dt-bootstrap4 no-footer">
            <div className="row ">
              <div className="col-sm-12 row1">
                <VendorTable
                  currentEntries={currentEntries}
                  selectedVendors={selectedVendors}
                  handleCheckboxChange={handleCheckboxChange}
                  handleToggle={handleToggle}
                  handleDelete={confirm}
                  getContinuousIndex={getContinuousIndex}
                />
              </div>
              <div className="row mt-3">
                <div className="col-sm-12 col-md-5">
                  <div className="dataTables_info"
                    role="status"
                  >
                    Showing {indexOfFirstEntry + 1} to{" "}
                    {Math.min(indexOfLastEntry, filteredVendors.length)} of{" "}
                    {filteredVendors.length} entries
                  </div>
                </div>
                <div className="col-sm-12 col-md-7 ">
                  <nav
                    aria-label="Page navigation example"
                    style={{ float: "right" }}
                  >
                    <ul className="pagination">
                      {pageNumbers.map((number) => (
                        <li
                          key={number}
                          className={`page-item ${number === currentPage ? "active" : ""
                            }`}
                        >
                          <button className="page-link"
                            onClick={() => setCurrentPage(number)}
                          >
                            {number}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default Vendor;
