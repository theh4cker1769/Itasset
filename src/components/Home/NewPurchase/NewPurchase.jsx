import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewPurchase = ({ sidebarOpen }) => {

    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    const companyID = localStorage.getItem("companyID");

    // product name
    const [productName, setProductName] = useState("");
    const handleProductName = (e) => {
        setProductName(e.target.value);
    }

    // brand
    const [brand, setBrand] = useState("");
    const brands = [
        { label: "Apple", value: "Apple" },
        { label: "Samsung", value: "Samsung" },
        { label: "Nokia", value: "Nokia" },
        { label: "Sony", value: "Sony" },
        { label: "LG", value: "LG" },
        { label: "HTC", value: "HTC" },
        { label: "Motorola", value: "Motorola" },
        { label: "Lenovo", value: "Lenovo" },
        { label: "Huawei", value: "Huawei" },
        { label: "Xiaomi", value: "Xiaomi" },
        { label: "Oppo", value: "Oppo" },
        { label: "Vivo", value: "Vivo" },
        { label: "OnePlus", value: "OnePlus" },
        { label: "Google", value: "Google" },
        { label: "Asus", value: "Asus" },
        { label: "Acer", value: "Acer" },
        { label: "Toshiba", value: "Toshiba" },
        { label: "HP", value: "HP" },
        { label: "Dell", value: "Dell" },
        { label: "Lenovo", value: "Lenovo" },
        { label: "Microsoft", value: "Microsoft" },
        { label: "IBM", value: "IBM" },
        { label: "Compaq", value: "Compaq" },
        { label: "Acer", value: "Acer" },
        { label: "Fujitsu", value: "Fujitsu" },
        { label: "Panasonic", value: "Panasonic" },
        { label: "Sharp", value: "Sharp" },
        { label: "Toshiba", value: "Toshiba" },
        { label: "Sony", value: "Sony" },
        { label: "LG", value: "LG" },
        { label: "Samsung", value: "Samsung" },
        { label: "Philips", value: "Philips" },
        { label: "Hisense", value: "Hisense" },
        { label: "TCL", value: "TCL" },
        { label: "Haier", value: "Haier" },
    ]
    const handleBrand = (e) => {
        setBrand(e.target.value);
    }

    // product category
    const [productCategory, setProductCategory] = useState("");
    const productCategorys = [
        { label: "Mobile Phones", value: "Mobile Phones" },
        { label: "Laptops", value: "Laptops" },
        { label: "Desktops", value: "Desktops" },
        { label: "Tablets", value: "Tablets" },
        { label: "Printers", value: "Printers" },
        { label: "Scanners", value: "Scanners" },
        { label: "Monitors", value: "Monitors" },
        { label: "Servers", value: "Servers" },
        { label: "Storage Devices", value: "Storage Devices" },
        { label: "Gaming Consoles", value: "Gaming Consoles" },
        { label: "Cameras", value: "Cameras" },
    ]
    const handleProductCategory = (e) => {
        setProductCategory(e.target.value);
    }

    // purchase price
    const [purchasePrice, setPurchasePrice] = useState("");
    const handlePurchasePrice = (e) => {
        setPurchasePrice(e.target.value);
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
    const [purchaseMethod, setPurchaseMethod] = useState("");
    const purchaseMethods = [
        { label: "Credit Card", value: "Credit Card" },
        { label: "Debit Card", value: "Debit Card" },
        { label: "Master Card", value: "Master Card" },
        { label: "Visa Card", value: "Visa Card" },
        { label: "Paypal", value: "Paypal" },
        { label: "Cash", value: "Cash" },
        { label: "Cheque", value: "Cheque" },
        { label: "Bank Transfer", value: "Bank Transfer" },
    ]
    const handlePurchaseMethod = (e) => {
        setPurchaseMethod(e.target.value);
    }


    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/newpurchase`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product_name: productName,
                    brand: brand,
                    product_category: productCategory,
                    purchase_price: purchasePrice,
                    purchase_date: startDate,
                    purchase_method: purchaseMethod,
                    user_id: userID,
                    company_id: companyID
                })
            })
            if (response.ok) {
                alert("New purchase added successfully");
                navigate("/home");
            }
        } catch (error) {
            console.error("Error adding new purchase:", error);
        }
    }
    return (
        <main id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
            <div className="card" id="main-product">
                <div id="product">
                    <p className="addhead">New Purchase</p>
                    <form>
                        <div id="data">

                            <div>
                                <label>
                                    Product Name<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={handleProductName}
                                    value={productName}
                                />
                            </div>

                            <div>
                                <label>
                                    Brand<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <select
                                    className="form-control"
                                    onChange={handleBrand}
                                    value={brand}
                                >
                                    <option value="">--Choose a Brand--</option>
                                    {brands.map((v, i) => (
                                        <option key={i} value={v.value}>
                                            {v.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>
                                    Product Category<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <select className="form-control" onChange={handleProductCategory} value={productCategory}>
                                    <option value="">--Choose a Category--</option>
                                    {productCategorys.map((v, i) => (
                                        <option key={i} value={v.value}>
                                            {v.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>
                                    Purchase Price<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={handlePurchasePrice}
                                    value={purchasePrice}
                                />
                            </div>

                            <div>
                                <label>
                                    Purchase Date<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <DatePicker className='form-control' selected={startDate} onChange={handleDate} />
                            </div>

                            <div>
                                <label>
                                    Purchase Method<span style={{ color: "red" }}> *</span>
                                </label>
                                <br />
                                <select className="form-control" onChange={handlePurchaseMethod} value={purchaseMethod}>
                                    <option value="">--Choose a Purchase Method--</option>
                                    {purchaseMethods.map((v, i) => (
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

export default NewPurchase