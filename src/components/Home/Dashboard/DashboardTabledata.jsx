import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LatestSubscription from "./LatestSubscription";

const DashboardTabledata = () => {

  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");


  const [assetPurchase, setAssetPurchase] = useState([])
  const fetchAssetPurchase = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/newpurchase?user_id=${userID}&company_id=${companyID}`);
      const data = await response.json();
      setAssetPurchase(data.newpurchase)
    } catch (error) {
      console.error("Error fetching asset purchase data:", error);
    }
  }

  useEffect(() => {
    fetchAssetPurchase();
  }, [])

  return (
    <>
      <div className="container">
        <div className="button-asset-dashboard">
          <Link to="/addlist" className="btn btn-primary btn" id="assets-unasign-button">
            UNASSIGN ASSETS
          </Link>
          <Link to="/assignasset" className="btn btn-dark btn" id="assets-asign-button">
            ASSIGN ASSETS
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <h4>Latest Assets Purchase</h4>
          </div>

          <div className="col-md-6">
            <NavLink to="/new-purchase" >
              <button
                className="btn btn-primary btnn "
                id="new_puechse"
              >
                New Purchase +
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="row mt-3 cardborder" id="form-div">
        <table className="table">
          <thead>
            <tr className="lightblue">
              <th>Product name</th>
              <th>Brand</th>
              <th>Product category</th>
              <th>Purchase Price</th>
              <th>Purchase Date</th>
              <th>Purchase Method</th>
            </tr>
          </thead>

          <tbody>
            {assetPurchase.map((purchase) => (
              <tr key={purchase.product_id} className="odd">
                <td>{purchase.product_name}</td>
                <td>{purchase.brand}</td>
                <td>{purchase.product_category}</td>
                <td>{purchase.purchase_price}</td>
                <td>{purchase.purchase_date.slice(0,10)}</td>
                <td>{purchase.purchase_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <LatestSubscription />
      </div>
    </>
  );
};

export default DashboardTabledata;
