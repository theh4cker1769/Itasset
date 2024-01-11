import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Add_Product.css';


const EditProduct = ({ sidebarOpen }) => {
  const [productTypes, setProductTypes] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [productCategory, setProductCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [products, setProducts] = useState([]);
  const [CompanyId, setCompanyId] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/producttype`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductTypes(data.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };
    fetchProductTypes();
  }, []);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/productCategory`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductCategories(data.data);
      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
    };
    fetchProductCategories();
  }, []);

  const fetchProductsbyid = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/${params.id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
      setProductCategory(data.data.product_category)
      setProductType(data.data.product_type)
      setProductName(data.data.product_name)
      setManufacturer(data.data.manufacturer)
    } catch (error) {
      console.log("unsuccess");
    }
  };

  useEffect(() => {
    fetchProductsbyid();
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_category: productCategory,
          // product_type: productType,
          // product_name: productName,
          // manufacturer: manufacturer
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      navigate("/product");
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  console.log("Product Category:", productCategory);

  return (
    <>
      <main id="main" className={`main-content ${sidebarOpen ? 'shift-right' : ''}`}>
        <div className="card" id="main-product">
          <div id="product">
            <p className="addhead">Edit Product</p>
            <form>
              <div id="data">
                <label>Product Category</label>
                <br />
                <select className="form-control" value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value, 10)}>
                  <option value="">--Choose a Category--</option>
                  {productCategories.map((product) => (
                    <option key={product.id} value={product.ProductCategory}>{product.ProductCategory}</option>
                  ))}
                </select>

                {/* <div>
                  <label>Product Type</label>
                  <select className="form-control" value={productType} onChange={(e) =>
                    (setProductType(e.target.value))}>
                    <option value="">--Choose a Product Type--</option>
                    {productTypes.map((productType) => (
                      <option key={productType.id} value={productType.product_type_name}>{productType.product_type_name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Product Name</label>
                  <br />
                  <input type="text" className="form-control" value={productName}
                    onChange={(e) => setProductName(e.target.value)} />
                </div>

                <div>
                  <label >Manufacturer</label>
                  <br />
                  <input type="text" className="form-control" value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)} />
                </div> */}

                <div className='d-flex gap-2 mt-3'>
                  <Link to="/Product" className="btn btn-dark" >Back</Link>
                  <button type="button" className="button" onClick={updateProduct}>Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <br />
      </main>
    </>
  );
};

export default EditProduct;
