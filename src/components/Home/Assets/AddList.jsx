import React, { useEffect, useState } from "react";
import "./AddList.css";
import { Link, NavLink } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from "axios";
import { set } from "react-hook-form";

const AddList = ({ sidebarOpen }) => {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");

  const handleCheckboxChange = (assetId) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(selectedAssets.filter((id) => id !== assetId));
    } else {
      setSelectedAssets([...selectedAssets, assetId]);
    }
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
        selectedAssets.map((id) =>
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/assets/${id}`, { method: "DELETE" })
        )
      );
      setAssets(assets.filter((asset) => !selectedAssets.includes(asset.id)));
      setSelectedAssets([]); // Clear selected vendors after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id, newStatus) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/assets/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setAssets((prevAssets) =>
        prevAssets.map((asset) => (asset.serial_number === id ? { ...asset, is_active: newStatus } : asset))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const assetData = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + "/api/assets/getdata", {
        params: {
          user_id: localStorage.getItem("userID"),
          company_id: localStorage.getItem("companyID")
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

  // For Product Categories
  const [productCategories, setProductCategories] = useState([]);
  useEffect(() => {
    const fetchDataProductCategory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/productCategory`);
        const data = await response.json();
        setProductCategories(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataProductCategory()
  }, [])

  const getProductCategory = (id) => {
    const category = productCategories.find((category) => category.id == id);
    return category ? category.ProductCategory : "Unknow";
  };


  // For Product Types
  const [productTypes, setProductTypes] = useState([]);
  useEffect(() => {
    const fetchDataProductTypes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/producttype`);
        const data = await response.json();
        setProductTypes(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataProductTypes()
  }, [])

  const getProductType = (id) => {
    const type = productTypes.find((type) => type.product_type_id == id);
    return type ? type.product_type_name : "Unknow";
  };

  // For Vendors
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    const fetchDataVendors = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/vendors?user_id=${userID}&company_id=${companyID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVendors(data.vendors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataVendors()
  }, [])

  const getVendor = (id) => {
    const vendor = vendors.find((vendor) => vendor.vendor_id == id);
    return vendor ? vendor.vendor_name : "Unknow";
  };


  // For Locations
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchDataLocations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/get-locations?user_id=${userID}&company_id=${companyID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLocations(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataLocations()
  }, [])

  const getLocations = (id) => {
    const location = locations.find((location) => location.location_id == id);
    return location ? location.office_name : "Unknow";
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filterAssets = Array.isArray(assets) ? assets.filter((asset) =>
  //   asset.asset_name.toLowerCase() === searchTerm.toLowerCase() ||
  //   asset.product_name.toLowerCase() === searchTerm.toLowerCase() ||
  //   asset.serial_number.toLowerCase() === searchTerm.toLowerCase()
  // ) : [];

  const confirm = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
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
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/assets/${id}`, { method: 'DELETE' });
      setAssets(assets.filter(asset => asset.serial_number !== id));
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentAssets = assets.slice(indexOfFirstEntry, indexOfLastEntry);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(assets.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const downloadExcel = () => {

    const filteredData = currentAssets.map(item => ({
      "Asset Name": item.asset_name,
      "Serial Number": item.serial_number,
      "Product Type": item.product_type,
      "Product": item.product_name,
      "Vendor": item.vendor
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
        <div className="container-main">
          <div className="row">
            <div className="col-sm-12">
              <div className="title">
                <h4>Asset list</h4>
              </div>
            </div>
          </div>
          <section className="section-1">
            <div className="row">
              <div className="col-md-12">
                <button className="btn mx-1" id="button" style={{ backgroundColor: "#386996", width: "160px" }}>
                  <NavLink to="/assetadd" className="link">Add Asset</NavLink>
                </button>
                <button className="btn btn-dark btn-vendor mx-3" onClick={downloadExcel}>
                  Export
                </button>
                <button className="btn btn-primary" onClick={submit} id="button" style={{ width: "160px" }}>
                  Delete
                </button>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-12">
              <div className="input-group rounded blue">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onChange={handleSearch}
                />
                <span className="input-group-text border-0 " id="search-addon">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-md-12 d-flex gap-2">
                <span className="entry_show">Show</span>
                <select
                  name="entriesPerPage"
                  aria-controls="DataTables_Table_3"
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
            <div className="row mt-3">
              <div className="col-md-12">
                <table className="checkbox-datatable table nowrap dataTable no-footer dtr-inline addlist-table" id="DataTables_Table_3" role="grid" aria-describedby="DataTables_Table_3_info">
                  <thead>
                    <tr role="row" className="lightblue">
                      <th className="dt-body-center sorting_disabled" rowspan="1" colspan="1" aria-label="">
                        <div className="dt-checkbox">
                          <input type="checkbox" name="select_all" value="1" id="example-select-all" />
                          <span className="dt-checkbox-label"></span>
                        </div>
                      </th>
                      <th className="sorting_desc" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" aria-sort="descending">
                        S.No
                      </th>
                      <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending">
                        Asset Name
                      </th>
                      <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending">
                        Serial Number
                      </th>
                      <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                        Products Category
                      </th>
                      <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                        Products type
                      </th>
                      <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                        Product
                      </th>
                      <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                        Vendor
                      </th>
                      <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                        Location
                      </th>
                      <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                        Current State
                      </th>
                      <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAssets.map((asset, index) => (
                      <tr role="row" className="odd" key={asset.serial_number}>
                        <td className="dt-body-center" tabIndex="0">
                          <div className="dt-checkbox">
                            <input type="checkbox" name="id[]" value={asset.serial_number} onChange={() => handleCheckboxChange(asset.serial_number)} />
                            <span className="dt-checkbox-label"></span>
                          </div>
                        </td>
                        <td className="sorting_1">{index + 1}</td>
                        <td className="">{asset.asset_name}</td>
                        <td>{asset.serial_number}</td>
                        <td>{getProductCategory(asset.product_category)}</td>
                        <td>{getProductType(asset.product_type)}</td>
                        <td>{asset.product_name}</td>
                        <td>{getVendor(asset.vendor)}</td>
                        <td>{getLocations(asset.address)}</td>
                        <td>
                          <div className="form-check form-switch switch-align">
                            <input className="form-check-input" type="checkbox" checked={asset.is_active} id={`toggleSwitch-${asset.serial_number}`} onChange={() => handleToggle(asset.serial_number, !asset.is_active)} />
                          </div>
                        </td>
                        {/* <td>
                        {asset.name ?
                            <>
                            <button className="btn btn-warning">Repair</button>
                            &nbsp;
                            <button className="btn btn-danger">Return</button>
                            </>
                            :
                            <></>
                          }
                        </td> */}
                        <td>
                          <div style={{ color: "#0d6efd" }}>
                            <Link to={`/editasset/${asset.serial_number}`} className="ey1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                              </svg>

                            </Link>
                            &nbsp;
                            <button onClick={() => confirm(asset.serial_number)} >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-sm-12 col-md-5">
                <div className="dataTables_info" id="DataTables_Table_3_info" role="status" aria-live="polite">
                  Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, assets.length)} of {assets.length} entries
                </div>
              </div>
              <div className="col-sm-12 col-md-7">
                <nav aria-label="Page navigation example" style={{ float: "right" }}>
                  <ul className="pagination">
                    {pageNumbers.map((number) => (
                      <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(number)}>
                          {number}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </section>
        </div >
      </main >
    </>
  );
};

export default AddList;