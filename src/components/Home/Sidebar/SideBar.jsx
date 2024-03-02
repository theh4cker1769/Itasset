import React, { useState } from "react";
import "./Sidebar.css";
import { Link, NavLink, useLocation } from "react-router-dom"

const Sidebar = ({ isOpen, toggle }) => {
  const [open, setOpen] = useState(true);
  const [adminopen, setAdminOpen] = useState(true);
  const [showMinusIcon, setShowMinusIcon] = useState(true);
  const [showAdminSection, setShowAdminSection] = useState(true);

  const toggleSection = () => {
    setOpen(!open);
    setShowMinusIcon(!showMinusIcon);
  };

  const toggleAdminSection = () => {
    setAdminOpen(!adminopen);
    setShowAdminSection(!showAdminSection);
  };

  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  return (
    <nav id="sidebar" className={isOpen ? "active" : ""}>
      <section className="pt-4">
        <ul className="list-unstyled components" id="side-ul">
          <li id="list-card" className="mb-3">
            <NavLink to={"/home"} activeClassName="active-link"> <i class="fa-solid fa-house"></i> Home</NavLink>
          </li>
          <li id="list-card" className="mb-3">
            <NavLink to={"/vendor"} activeClassName="active-link"> <i class="fa-solid fa-user-group"></i> Vendors</NavLink>
          </li>
          <li id="list-card" className="mb-3">
            <NavLink to={"/product"} activeClassName="active-link"> <i class="fa-brands fa-codepen"></i> Products</NavLink>
          </li>
          <li id="list-card" className="mb-3 p-1">
            <div className="row m-0" onClick={toggleSection}>
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md-6" id="Admin_column">
                    <a className={activePath === "/assetadd" ? "active" : activePath === "/addlist" ? "active" : ""}> <i class="fa-solid fa-gear"></i> Assets</a>
                  </div>
                  <div className="col-md-4"></div>
                  <div className="col-md-2" id="plus">
                    <button className="border-0" onClick={toggleSection}>
                      {open ? (
                        <i className="fas fa-plus"></i>
                      ) : (
                        <i className="fas fa-minus"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="dropdown_asset p-0">
                <section className={open ? "drop-assests" : "hidden"}>
                  <li id="dropmenu_asset">
                    <NavLink to={"/assetadd"} activeClassName="active-link" onClick={() => setActivePath("/assetadd")}>
                      Add
                    </NavLink>
                  </li>
                  <li id="dropmenu_asset">
                    <NavLink to={"/addlist"} activeClassName="active-link" onClick={() => setActivePath("/addlist")}>List</NavLink>
                  </li>
                  <li id="dropmenu_asset">
                    <NavLink to={"/assignassets"} activeClassName="active-link" onClick={() => setActivePath("/assignassets")}>Assign Assets</NavLink>
                  </li>
                  <li id="dropmenu_asset">
                    <NavLink to={"/returnedassets"} activeClassName="active-link" onClick={() => setActivePath("/returnedassets")}>Returned Assets</NavLink>
                  </li>
                  <li id="dropmenu_asset">
                    <NavLink to={"/repairassets"} activeClassName="active-link" onClick={() => setActivePath("/repairassets")}>Repair Assets</NavLink>
                  </li>
                </section>
              </div>
            </div>
          </li>
          <li id="list-card" className="p-1">
            <div className="row m-0" onClick={toggleAdminSection}>
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md-6" id="Admin_column">
                    <a className={activePath === "/location" ? "active" : activePath === "/notification" ? "active" : activePath === "/deparment" ? "active" : activePath === "/employee" ? "active" : ""}> <i class="fa-solid fa-crown"></i> Admin</a>
                  </div>
                  <div className="col-md-4"></div>
                  <div className="col-md-2" id="plus">
                    <button className="border-0" onClick={toggleAdminSection}>
                      {adminopen ? (
                        <i className="fas fa-plus"></i>
                      ) : (
                        <i className="fas fa-minus"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="dropdown_asset p-0">
                <section className={adminopen ? "drop-assests" : "hidden"}>
                  <li id="dropmenu_asset"><NavLink to={"/location"} activeClassName="active-link" onClick={() => setActivePath("/location")}>Location</NavLink></li>
                  <li id="dropmenu_asset" ><NavLink to={"/notification"} activeClassName="active-link" onClick={() => setActivePath("/notification")}>Notification</NavLink></li>
                  <li id="dropmenu_asset"><NavLink to={"/deparment"} activeClassName="active-link" onClick={() => setActivePath("/deparment")}>Department</NavLink></li>
                  <li id="dropmenu_asset"><NavLink to={"/employee"} activeClassName="active-link" onClick={() => setActivePath("/employee")}>Employee</NavLink></li>
                </section>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </nav>
  );
};
export default Sidebar;
