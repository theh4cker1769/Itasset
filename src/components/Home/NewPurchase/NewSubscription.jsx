import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewSubscription = ({ sidebarOpen }) => {

    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    const companyID = localStorage.getItem("companyID");

    // software name
    const [softwareName, setSoftwareName] = useState("");
    const handleSoftwareName = (e) => {
        setSoftwareName(e.target.value);
    }

    // plan
    const [plan, setPlan] = useState("");
    const plans = [
        { label: "Basic", value: "Basic" },
        { label: "Standard", value: "Standard" },
        { label: "Premium", value: "Premium" },
        { label: "Enterprise", value: "Enterprise" },
    ]
    const handlePlan = (e) => {
        setPlan(e.target.value);
    }

    // billing period
    const [billingPeriod, setBillingPeriod] = useState("");
    const billingPeriods = [
        { label: "Monthly", value: "Monthly" },
        { label: "Quarterly", value: "Quarterly" },
        { label: "Half Yearly", value: "Half Yearly" },
        { label: "Yearly", value: "Yearly" },
    ]
    const handleBillingPeriods = (e) => {
        setBillingPeriod(e.target.value);
    }

    // amount
    const [amount, setAmount] = useState("");
    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

    // purchase date
    const [startDate, setStartDate] = useState(new Date());
    const handleDate = (date) => {
        let timezoneOffset = date.getTimezoneOffset() * 60000; 
        let adjustedDate = new Date(date.getTime() - timezoneOffset);

        // Convert date into 2024-02-21 format
        let formattedDate = adjustedDate.toISOString().slice(0, 10);
        setStartDate(formattedDate);
    }

    // purchase method
    const [paymentMethod, setPaymentMethod] = useState("");
    const paymentMethods = [
        { label: "Credit Card", value: "Credit Card" },
        { label: "Debit Card", value: "Debit Card" },
        { label: "Master Card", value: "Master Card" },
        { label: "Visa Card", value: "Visa Card" },
        { label: "Paypal", value: "Paypal" },
        { label: "Cash", value: "Cash" },
        { label: "Cheque", value: "Cheque" },
        { label: "Bank Transfer", value: "Bank Transfer" },
    ]
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
    }


    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/newsubscription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    software_name: softwareName,
                    plan: plan,
                    billing_period: billingPeriod,
                    amount: amount,
                    purchase_date: startDate,
                    payment_method: paymentMethod,
                    user_id: userID,
                    company_id: companyID,
                })
            })
            if (response.ok) {
                alert("New subscription added successfully");
                navigate("/home");
            }
        } catch (error) {
            console.error("Error adding new subscription:", error);
        }
    }
    return (
        <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
            <div className="card" id="main-product">
                <div id="product">
                    <p className="addhead">New Subscription</p>
                    <form>
                        <div id="data">

                            <div>
                                <label>
                                    Software Name<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={handleSoftwareName}
                                    value={softwareName}
                                />
                            </div>

                            <div>
                                <label>
                                    Plan<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <select
                                    className="form-control"
                                    onChange={handlePlan}
                                    value={plan}
                                >
                                    <option value="">--Choose a Plan--</option>
                                    {plans.map((v, i) => (
                                        <option key={i} value={v.value}>
                                            {v.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>
                                    Billing Period<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <select className="form-control" onChange={handleBillingPeriods} value={billingPeriod}>
                                    <option value="">--Choose a Billing Period--</option>
                                    {billingPeriods.map((v, i) => (
                                        <option key={i} value={v.value}>
                                            {v.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>
                                    Amount<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={handleAmount}
                                    value={amount}
                                />
                            </div>

                            <div>
                                <label>
                                    First Payment<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <DatePicker className='form-control' selected={startDate} onChange={handleDate} />
                            </div>

                            <div>
                                <label>
                                    Payment Method<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <select className="form-control" onChange={handlePaymentMethod} value={paymentMethod}>
                                    <option value="">--Choose a Payment Method--</option>
                                    {paymentMethods.map((v, i) => (
                                        <option key={i} value={v.value}>
                                            {v.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="d-flex gap-2 mt-3">
                                <NavLink to="/home" type="button" className="btn btn-dark">
                                    Close
                                </NavLink>
                                <button type="button" className="button" onClick={handleSubmit}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default NewSubscription