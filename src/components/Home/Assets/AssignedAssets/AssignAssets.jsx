import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, NavLink } from 'react-router-dom';

const AssignAssets = ({ sidebarOpen }) => {
    const userID = localStorage.getItem("userID");
    const companyID = localStorage.getItem("companyID");

    // assignend Assets
    const [assignedAssets, setAssignedAssets] = useState([])
    useEffect(() => {
        const fetchAssignedAssets = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/assigned-assets?user_id=${userID}&company_id=${companyID}`)
                const data = await response.json()
                setAssignedAssets(data.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        }
        fetchAssignedAssets();
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

    // Delete

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
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/assigned-assets/${id}`, { method: 'DELETE' });
            setAssignedAssets(assignedAssets.filter(asset => asset.assignassets_id !== id));
        }
        catch (error) {
            console.error(error);
        }
    };

    // Pagenation
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentAssets = assignedAssets.slice(indexOfFirstEntry, indexOfLastEntry);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(assignedAssets.length / entriesPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
            <div className="container-main">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="title">
                            <h4>Assigned Assets </h4>
                        </div>
                    </div>
                </div>
                <section className="section-1">
                    <div className="row">
                        <div className="col-md-12">
                            <button className="btn mx-1" id="button" style={{ backgroundColor: "#386996", width: "160px" }}>
                                <NavLink to="/assign-asset-add" className="link">Add Assign Asset</NavLink>
                            </button>
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
                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending">
                                            Asset Operation
                                        </th>
                                        <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_3" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentAssets.map((v, i) => (
                                        <tr role="row" className="odd assign-asset-table" key={v.assignassets_id}>
                                            <td className="sorting_1">{i + 1}</td>
                                            <td>{getAssetName(v.assets_id)}</td>
                                            <td>{getEmployeeName(v.emp_id)}</td>
                                            <td> <Link to={v.image} target='_blank'> <img src={v.image} alt="Image" /></Link> </td>
                                            <td>{v.description}</td>
                                            <td>{v.assign_date.slice(0, 10)}</td>
                                            <td>
                                                {v.status ?
                                                    <>
                                                        {v.status}
                                                    </>
                                                    :
                                                    <>
                                                        <Link to={`/returnassignedasset/${v.assignassets_id}`}><button className='btn btn-warning'>Return</button></Link> &nbsp;
                                                        <Link to={`/repairassignedasset/${v.assignassets_id}`}><button className='btn btn-danger'>Repair</button></Link>
                                                    </>
                                                }
                                            </td>
                                            <td>
                                                <div style={{ color: "#0d6efd" }}>
                                                    <Link to={`/editassignedasset/${v.assignassets_id}`} className="ey1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                                                        </svg>

                                                    </Link>
                                                    &nbsp;
                                                    <button onClick={() => confirm(v.assignassets_id)} >
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
                                Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, assignedAssets.length)} of {assignedAssets.length} entries
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

export default AssignAssets