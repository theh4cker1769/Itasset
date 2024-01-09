import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import ProductThead from "./ProductThead";
import ProductEntityshow from "./ProductEntityshow";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { API_BASE_URL } from './../../apiConfig';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Product = ({ sidebarOpen }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [status, setStatus] = useState(true);
  const [id, setId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/api/product-data");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.log("unsuccess");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const confirm = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDelete = async (id) => {

    try {
      const response = await fetch(API_BASE_URL + '/api/products/' + id,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Remove the deleted product from state
        console.log(id)
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        console.error("Delete request failed");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };


  const submitDelete = (selectedProducts) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteSelected(selectedProducts),
        },
        {
          label: "No",
        },
      ],
    });
  };


  const toggleSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedProducts.map((id) =>
          fetch(API_BASE_URL + '/api/products/' + id, {
            method: "DELETE",
          })
        )
      );
      // Remove the deleted products from state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => !selectedProducts.includes(product.id))
      );
      setSelectedProducts([]);
    } catch (error) {
      console.error(error);
    }
  };


  const handleToggle = async (id, newStatus) => {
    try {
      const response = await fetch(API_BASE_URL + '/api/products/' + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_active: newStatus,
          }),
        }
      );

      if (response.ok) {
        setProducts((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  const filterData = () => {
    return products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterData().slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadExcel = () => {

    const filteredData = products.map(item => ({
      "Product Category": item.product_category,
      "Product Type": item.product_type,
      "Product Name": item.product_name,
      "Manufacturer": item.manufacturer,
    }));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the filtered JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convert the buffer to a Blob
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    // Use FileSaver to save the file
    saveAs(blob, 'productData.xlsx');
  }

  return (
    <>
      <main
        id="main"
        className={`main-content ${sidebarOpen ? "shift-right" : ""}`}
      >
        <div className="card">
          <section className="product_section">
            <div className="row">
              <div className="col-md-6">
                <div className="title">
                  <h3 className="m-3">PRODUCTS</h3>
                </div>
              </div>
              <hr />
            </div>
            <div className="row">
              <div className="col-md-12 d-flex gap-2">
                <button className="btn-vendor">
                  <Link
                    to="/addproduct"
                    className="btn btn-primary"
                    id="addproduct"
                  >
                    {" "}
                    Add Product
                  </Link>
                </button>
                <button className="btn btn-dark btn-vendor" onClick={downloadExcel}>
                  Export
                </button>

                <button
                  className="btn btn-primary"
                  id="delete"
                  onClick={() => submitDelete(selectedProducts)}
                >
                  Delete
                </button>

              </div>
            </div>
            <div className="col-md-4 col-12" id="product_searchQuery">
              <div className="input-group rounded blue">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search By Product Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span
                  className="input-group-text border-0 blue"
                  id="search-addon"
                >
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>

            <ProductEntityshow />
            <div className="row row1">
              <div className="col-sm-12">
                <table className="checkbox-datatable table">
                  <ProductThead />
                  <tbody>
                    {currentProducts.map((product, index) => (
                      <tr role="row" className="odd" key={product.product_id}>
                        <td className="dt-body-center" tabIndex="0">
                          <div key={product.product_id}>
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.product_id)}
                              onChange={() => toggleSelect(product.product_id)}
                            />
                          </div>
                        </td>
                        <td className="">{index + 1}</td>
                        <td className="sorting_1">{product.product_name}</td>
                        <td>{product.product_type}</td>
                        <td>{product.product_category}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={status}
                              handleCheckboxChange={handleCheckboxChange}
                              onClick={(e) =>
                                handleToggle(product.product_id, e.target.checked)
                              }
                              id={`flexSwitchCheckChecked-${product.product_id}`}
                              defaultChecked={product.is_active}
                            />
                          </div>
                        </td>
                        <td>
                          <div
                            className="d-flex justify-content-evenly"
                            id="edit_product"
                          >
                            <Link to={`/editproduct/${product.product_id}`}>
                              <i className="fa-solid fa-pen-to-square" />
                            </Link>
                            <i
                              className="fa-solid fa-trash mt-1"
                              onClick={() => confirm(product.product_id)}
                            />
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
                <div className="dataTables_info">
                  Showing {indexOfFirstProduct + 1} to{" "}
                  {Math.min(indexOfLastProduct, filterData().length)} of{" "}
                  {filterData().length} entries
                </div>
              </div>

              <div className="col-sm-12 col-md-7">
                <nav aria-label="Page navigation example" id="pagi-product">
                  <ul className="pagination">
                    {Array.from({
                      length: Math.ceil(filterData().length / productsPerPage),
                    }).map((_, index) => (
                      <li
                        key={index}
                        className={`page-item
                       ${currentPage === index + 1 ? "active" : ""}`}
                      >
                        <Link
                          className="page-link"
                          to=""
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Product;
