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
          <Link to="/addlist" className="btn btn-dark btn" id="assets-asign-button">
            ASSIGN ASSETS
          </Link>
        </div>
      </div>

      <div>
        <LatestSubscription />
      </div>
    </>
  );
};

export default DashboardTabledata;
