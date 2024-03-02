import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

const RepairAssets = ({sidebarOpen}) => {

    const userID = localStorage.getItem("userID");
    const companyID = localStorage.getItem("companyID");

    // repair Assets
    const [repairAssets, setRepairAssets] = useState([])
    useEffect(() => {
        const fetchRepairAssets = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/repair-assets?user_id=${userID}&company_id=${companyID}`)
                const data = await response.json()
                setRepairAssets(data.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        }
        fetchRepairAssets();
    }, []);


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

    const getAssetName = (id) => {
        const assetName = assets.find((a) => a.serial_number == id);
        return assetName ? assetName.asset_name : "Unknown";
    }

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

    const getEmployeeName = (id) => {
        const empName = emp && emp.find((e) => e.employee_id == id);
        return empName ? empName.name : "Unknown";
    }

    // Pagenation
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentAssets = repairAssets.slice(indexOfFirstEntry, indexOfLastEntry);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(repairAssets.length / entriesPerPage); i++) {
        pageNumbers.push(i);
    }
  return (
    <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
            <div className="container-main">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="title">
                            <h4>Repair Assets </h4>
                        </div>
                    </div>
                </div>
                <section className="section-1">
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
                                        <th className="sorting_desc" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" aria-sort="descending">
                                            S.No
                                        </th>
                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending">
                                            Asset Name
                                        </th>
                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending">
                                            Empoyee Name
                                        </th>
                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                                            Image
                                        </th>
                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                                            Description
                                        </th>
                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                                            Assigned Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentAssets.map((v, i) => (
                                        <tr role="row" className="odd assign-asset-table" key={v.repairasset_id}>
                                            <td className="sorting_1">{i + 1}</td>
                                            <td>{getAssetName(v.assets_id)}</td>
                                            <td>{getEmployeeName(v.emp_id)}</td>
                                            <td> <Link to={v.image} target='_blank'> <img src={v.image} alt="Image" /></Link> </td>
                                            <td>{v.repair_description}</td>
                                            <td>{v.repair_date.slice(0, 10)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-12 col-md-5">
                            <div className="dataTables_info" id="DataTables_Table_3_info" role="status" aria-live="polite">
                                Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, repairAssets.length)} of {repairAssets.length} entries
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
  )
}

export default RepairAssets