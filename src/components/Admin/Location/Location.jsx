import React, { useState, useEffect } from "react";
import "../Location/Location.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import LocationSearchBar from "./LocationSearchBar";
import LocationTable from "./LocationTable";
import LocationPagination from "./LocationPagination";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Location = ({ sidebarOpen }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(true);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const storedPage = localStorage.getItem("itemsPerPage");
    return storedPage ? parseInt(storedPage) : 5;
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/locations`);
        const data = await response.json();
        setData(data.locations);
      } catch (error) {}
    };

    fetchData();
  }, []);
  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/locations/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== itemId));
      } else {
      }
    } catch (error) {}
    window.location.reload();
  };

  console.log(data)

  useEffect(() => {
    if (data.state_province) {
      const stateUrl = `https://apis.itassetmgt.com:8443/api/v1/states/${data.state_id}`;
      fetch(stateUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => setStateName(response.state_name))
        .catch(() => setStateName("N/A"));
    }
  }, [data.state_id]);

  useEffect(() => {
    if (data.city_id) {
      const cityUrl = `https://apis.itassetmgt.com:8443/api/v1/cities/${data.city_id}`;
      fetch(cityUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => setCityName(response.city_name))
        .catch(() => setCityName("N/A"));
    }
  }, [data.city_id]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filterLocations = Array.isArray(data)
    ? data.filter(
        (data) =>
          data.office_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.contact_person_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.state_province.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/locations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_active: newStatus,
          }),
        }
      );
      if (response.ok) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, is_active: newStatus } : item
          )
        );
        console.log("status updated");
      } else {
        console.error("Error updating data:", response);
      }
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterLocations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
    localStorage.setItem("itemsPerPage", itemsPerPage.toString());
  }, [currentPage, itemsPerPage]);


  const downloadExcel = () => {

    const filteredData = data.map(item => ({
      "Office Name": item.office_name,
      "Contact Person Name": item.contact_person_name,
      "State": item.state_province,
      "City": item.city,
      "Zip Code": item.zip_code,
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
        <div className="card" id="sectionlocation">
          <section>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <h4>Locations</h4>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12 d-flex gap-2">
                <button className="btn-vendor">
                  <a
                    href="/addlocation"
                    className="btn btn-primary addlocationbtn"
                  >
                    Add Locations
                  </a>
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-dark btn-vendor" onClick={downloadExcel}>
                  Export
                </button>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-md-12 paginationdrop">
                <span className="entry_show">Show</span>
                <select
                  name="DataTables_Table_3_length"
                  aria-controls="DataTables_Table_3"
                  className="custom-select custom-select-sm form-control form-control-sm paginationselect"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(e.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={120}>all</option>
                </select>
                <span className="entry_show">entries</span>
              </div>
            </div>
            <div className="locationsearchbar">
            <LocationSearchBar handleSearch={handleSearch} />
            </div>
            <div className="locationtable">
            <LocationTable
              currentItems={currentItems}
              updateStatus={updateStatus}
              handleDelete={handleDelete}
            />
            <div className="row mt-3">
              <div className="col-sm-12 col-md-5">
                <div
                  className="dataTables_info"
                  id="DataTables_Table_3_info"
                  role="status"
                  aria-live="polite"
                >
                  {`Showing ${indexOfFirstItem + 1} to ${
                    indexOfLastItem > filterLocations.length
                      ? filterLocations.length
                      : indexOfLastItem
                  } of ${filterLocations.length} entries`}
                </div>
              </div>
            </div>
            </div>
            <div className="locationpaginate"> 
            <LocationPagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              filterLocations={filterLocations}
              paginate={paginate}
            />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Location;