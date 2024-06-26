import React, { useState } from "react";
import { Link } from "react-router-dom";

const AssetForm = ({
  productCategories,
  selectedProductCategory,
  setSelectedProductCategory,
  productTypes,
  selectedProductType,
  setSelectedProductType,
  products,
  selectedProduct,
  setSelectedProduct,
  vendors,
  selectedVendor,
  setSelectedVendor,
  assetName,
  setAssetName,
  price,
  setPrice,
  locations,
  selectedLocation,
  setSelectedLocation,
  purchaseDate,
  setPurchaseDate,
  warrantyExpiryDate,
  setWarrantyExpiryDate,
  selectedPurchaseType,
  setSelectedPurchaseType,
  description,
  setDescription,
  serial_number,
  setSerialNumber,
  mode,
  postData,
  updateData,
}) => {

  const purchaseTypes = [
    { id: 1, purchase_type: "Owned" },
    { id: 2, purchase_type: "Rented" },
    { id: 3, purchase_type: "Leased" },
    { id: 4, purchase_type: "Subscription" }
  ]

  return (
    <form>
      <div className="row">
        <div className="col-md-3">
          <label htmlFor="productCategory">
            Product Category<span style={{ color: "red" }}> *</span>
          </label>
          <br />
          <select
            id="productCategory"
            name="productCategory"
            className="form-control"
            value={selectedProductCategory}
            onChange={(e) => setSelectedProductCategory(e.target.value)}
          >
            <option value="">--Choose a Product Category--</option>
            {productCategories.map((productCategory) => (
              <option key={productCategory.id} value={productCategory.id}>
                {productCategory.ProductCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="productType">
            Product type <span style={{ color: "red" }}> *</span>
          </label>
          <select
            id="productType"
            name="productType"
            className="form-control"
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(e.target.value)}
          >
            <option value="">--Choose a Product--</option>
            {productTypes.map((productType) => (
              <option key={productType.product_type_id} value={productType.product_type_id}>
                {productType.product_type_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="product">
            Product<span style={{ color: "red" }}> *</span>
          </label>
          <select
            name="product"
            className="form-control"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value, 10)}
          >
            <option value="">--Choose a Product--</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="vendor">
            Vendor<span style={{ color: "red" }}> *</span>
          </label>
          <select
            id="vendor"
            name="vendor"
            className="form-control"
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            <option value="">--Choose a Vendor--</option>
            {vendors.map((vendor) => (
              <option key={vendor.vendor_id} value={vendor.vendor_id}>
                {vendor.vendor_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3">
          <label htmlFor="assetName">
            Asset name<span style={{ color: "red" }}> *</span>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="price">
            Price<span style={{ color: "red" }}> *</span>
          </label>
          <br />
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div class="col-md-3">
          <label htmlFor="Address">
            Location<span style={{ color: "red" }}> *</span>
          </label>
          <select
            class="form-control"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value, 10)}
          >
            <option>--select option--</option>
            {locations.map((loc) => (
              <option key={loc.location_id} value={loc.location_id}>
                {loc.office_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="purchaseDate">
            Purchase date<span style={{ color: "red" }}> *</span>
          </label>
          <br />
          <input
            type="date"
            className="form-control"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-3">
          <label htmlFor="warranty">
            Warranty Expiry Date<span style={{ color: "red" }}> *</span>
          </label>
          <br />
          <input
            type="date"
            class="form-control"
            value={warrantyExpiryDate}
            onChange={(e) => setWarrantyExpiryDate(e.target.value)}
          />
        </div>
        <div class="col-md-3">
          <label htmlFor="purhase_mode">
            Purchase type<span style={{ color: "red" }}> *</span>
          </label>
          <select
            class="form-control"
            value={selectedPurchaseType}
            onChange={(e) => setSelectedPurchaseType(e.target.value)}
          >
            <option value="">--Select Purchase type--</option>
            {purchaseTypes.map((purchaseType) => (
              <option key={purchaseType.id} value={purchaseType.purchase_type}>
                {purchaseType.purchase_type}
              </option>
            ))}
          </select>
        </div>


        <div className="col-md-3">
          <label htmlFor="assetName">
            Serial Number<span style={{ color: "red" }}> *</span>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            value={serial_number}
            onChange={(e) => setSerialNumber(e.target.value)}
            disabled={serial_number ? true : false}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <label htmlFor="Desc">
            Description<span style={{ color: "red" }}> *</span>
          </label>
          <br />
          <textarea
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-2 mt-3 w-100">
          {mode === "add" ? (
            <button type="button" className="button" onClick={postData}>
              Save
            </button>
          ) : (
            <button type="button" className="button" onClick={updateData}>
              Update
            </button>
          )}
          <Link to="/Addlist" className="btn btn-dark">
            Back
          </Link>
        </div>
      </div>
    </form>
  );
};
export default AssetForm;
