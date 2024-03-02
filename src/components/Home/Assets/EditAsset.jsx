import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import AssetForm from './AssetForm';
const EditAsset = ({ sidebarOpen }) => {
  const [productCategories, setProductCategories] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState();
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState();
  const [assetName, setAssetName] = useState("");
  const [price, setPrice] = useState();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [purchaseDate, setPurchaseDate] = useState();
  const [warrantyExpiryDate, setWarrantyExpiryDate] = useState();
  const [purchaseTypes, setPurchaseTypes] = useState([]);
  const [selectedPurchaseType, setSelectedPurchaseType] = useState();
  const [description, setDescription] = useState("");
  const [serial_number, setSerialNumber] = useState("");
  const [id, setId] = useState("")

  const userID = localStorage.getItem("userID");
  const companyID = localStorage.getItem("companyID");

  const navigate = useNavigate();
  const params = useParams();

  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataFunction(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/productCategory`, setProductCategories);
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/producttype`, setProductTypes);
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/product-data`, setProducts);
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/assets/asset_id/${params.id}`, setAssetData);
  }, [params.id]);

  // For vendors
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

  // For Locations
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

  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const setAssetData = (assetData) => {
    if (assetData) {
      // setId(assetData[0].asset_id);
      setAssetName(assetData[0].asset_name);
      setDescription(assetData[0].description);
      setPrice(assetData[0].price);
      setSelectedLocation(assetData[0].address);
      setSelectedProduct(assetData[0].product_name);
      setSelectedProductCategory(assetData[0].product_category);
      setSelectedProductType(assetData[0].product_type);
      setSelectedPurchaseType(assetData[0].purchase_type);
      setSelectedVendor(assetData[0].vendor);
      setWarrantyExpiryDate(convertDate(assetData[0].warranty_expiry_date));
      setPurchaseDate(convertDate(assetData[0].purchase_date));
      setSerialNumber(assetData[0].serial_number);
    }
  };


  const updateData = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/assets/${serial_number}`;
    const data = {
      product_category_id: selectedProductCategory,
      product_type_id: selectedProductType,
      product_id: selectedProduct,
      vendor_id: selectedVendor,
      asset_name: assetName,
      price: price,
      location_id: selectedLocation,
      purchase_date: purchaseDate,
      warranty_expiry_date: warrantyExpiryDate,
      purchase_type: selectedPurchaseType,
      description: description,
      serial_number: serial_number
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      console.log("Asset updated successfully");
      navigate('/addlist');
    } catch (error) {
      console.error("Error updating asset data:", error);
    }
  };
  return (
    <>
      <div id="main" className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
        <div className="container-1">
          <h3>
            <b>Edit Asset</b>
          </h3>
          <hr />
          <AssetForm
            mode="edit"
            productCategories={productCategories}
            selectedProductCategory={selectedProductCategory}
            setSelectedProductCategory={setSelectedProductCategory}
            productTypes={productTypes}
            selectedProductType={selectedProductType}
            setSelectedProductType={setSelectedProductType}
            products={products}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            vendors={vendors}
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
            assetName={assetName}
            setAssetName={setAssetName}
            price={price}
            setPrice={setPrice}
            locations={locations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            purchaseDate={purchaseDate}
            setPurchaseDate={setPurchaseDate}
            warrantyExpiryDate={warrantyExpiryDate}
            setWarrantyExpiryDate={setWarrantyExpiryDate}
            purchaseTypes={purchaseTypes}
            selectedPurchaseType={selectedPurchaseType}
            setSelectedPurchaseType={setSelectedPurchaseType}
            description={description}
            setDescription={setDescription}
            serial_number={serial_number}
            setSerialNumber={setSerialNumber}
            updateData={updateData}
          />
        </div>
      </div>
    </>
  );
};
export default EditAsset;