import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const LatestSubscription = () => {
  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");


  const [assetSubscription, setAssetSubscription] = useState([])
  const fetchAssetSubscription = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/newsubscription?user_id=${userID}&company_id=${companyID}`);
      const data = await response.json();
      setAssetSubscription(data.newsubscription)
    } catch (error) {
      console.error("Error fetching asset purchase data:", error);
    }
  }

  useEffect(() => {
    fetchAssetSubscription();
  }, [])

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <h4 className="col-md-6">Latest Subscriptions</h4>
          <div className="col-md-6">
            <NavLink to="/new-subscription">
              <button
                className="btn btn-primary btnn"
                id="new_subscription_main"
              >
                New Subscription +
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="row mt-3 cardborder" id="form-div">
        <table className="table">
          <thead>
            <tr className="lightblue">
              <th>Software Name</th>
              <th>Plan</th>
              <th>Billing Period</th>
              <th>Amount</th>
              <th>First Payment</th>
              <th>Payment Method</th>
            </tr>
          </thead>

          <tbody>
            {assetSubscription && assetSubscription.map((v, i) => (
              <tr key={i} className="odd">
                <td>{v.software_name}</td>
                <td>{v.plan}</td>
                <td>{v.billing_period}</td>
                <td>{v.amount}</td>
                <td>{v.purchase_date.slice(0,10)}</td>
                <td>{v.payment_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LatestSubscription;
