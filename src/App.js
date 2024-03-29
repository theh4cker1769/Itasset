import React from "react";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import Addeparment from "./components/Admin/Department/Addeparment";
import Department from "./components/Admin/Department/Deparment";
import AddEmployee from "./components/Admin/Employee/AddEmployee";
import Employee from "./components/Admin/Employee/Employee";
import AddLocation from "./components/Admin/Location/AddLocation";
import Location from "./components/Admin/Location/Location";
import Notification from "./components/Admin/Notification/Notification";
import Company from "./components/Company/CompanyInfo";
import Login from "./components/Devise/Login";
import SignUp from "./components/Devise/SignUp";
import AddList from "./components/Home/Assets/AddList";
import AssetAdd from "./components/Home/Assets/AssetAdd";
import Header from "./components/Home/Header/Header";
import Home from "./components/Home/Home/Home";
import Add_Product from "./components/Product/Add_Product";
import Product from "./components/Product/Product";
import Add_Vendor from "./components/Vendors/Add_Vendor";
import Vendor from "./components/Vendors/Vendor";
import ProfileSection from "./components/profile/ProfileSection";
import ForgetPassword from "./components/Devise/ForgetPassword";
import EditDepartment from "./components/Admin/Department/EditDepartment"
import Vendor_details from "./components/Vendors/Vendor_details";
import EditEmployee from "./components/Admin/Employee/EditEmployee";
import EditLocation from "./components/Admin/Location/EditLocation";
import Edit_Vendor from "./components/Vendors/Edit_Vendor";
import EditProduct from "./components/Product/EditProduct"
import EditAsset from "./components/Home/Assets/EditAsset";
import Nopage from "./components/Nopage";
import AssignAssetEdit from "./components/Home/Assets/AssignAssetEdit";
import AssignAssetList from "./components/Home/Assets/AssignAssetList";
import AssignListShow from "./components/Home/Assets/AssignListShow";
import NewPurchase from "./components/Home/NewPurchase/NewPurchase";
import NewSubscription from "./components/Home/NewPurchase/NewSubscription";
import LoginNew from "./components/Devise/LoginNew";
import ViewAssignAsset from "./components/Home/Assets/ViewAssignAsset";
import AssignAssets from "./components/Home/Assets/AssignedAssets/AssignAssets";
import AssignAssetsAdd from "./components/Home/Assets/AssignedAssets/AssignAssetsAdd";
import EditAssignedAssets from "./components/Home/Assets/AssignedAssets/EditAssignedAssets";
import ReturnAssignedAssets from "./components/Home/Assets/AssignedAssets/ReturnAssignedAssets";
import ReturnedAssets from "./components/Home/Assets/AssignedAssets/ReturnedAssets";
import RepairAssignedAssets from "./components/Home/Assets/AssignedAssets/RepairAssignedAssets";
import RepairAssets from "./components/Home/Assets/AssignedAssets/RepairAssets";

const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null; // Example check based on your storage
};

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function PrivateRoute({ element, path }) {
  if (isAuthenticated()) {
    return <Layout>{element}</Layout>;
  } else {
    return <Navigate to="/login" replace />;
  }
}


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<LoginNew/>}/>
          <Route path="/company" element={<Company />} />
          <Route path="/forgetpassword" element={ <ForgetPassword/> } />
          <Route path="/" element={localStorage.getItem("authToken")  ? (<Layout><Home/></Layout>) : (<Navigate replace to={"/login"}/>)} />
          <Route path="/home" element={localStorage.getItem("authToken")  ? (<Layout><Home/></Layout>) : (<Navigate replace to={"/login"}/>)} />
          <Route path="/addlocation" element={localStorage.getItem("authToken")  ? (<Layout><AddLocation/></Layout>) : (<Navigate replace to={"/login"}/>)} />
          <Route path="/deparment"  element={localStorage.getItem("authToken")  ? (<Layout><Department/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/adddeparment"  element={localStorage.getItem("authToken")  ? (<Layout><Addeparment/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/notification"  element={localStorage.getItem("authToken")  ? (<Layout><Notification/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/employee"  element={localStorage.getItem("authToken")  ? (<Layout><Employee/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/addemployee"  element={localStorage.getItem("authToken")  ? (<Layout><AddEmployee/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/addlist" element={localStorage.getItem("authToken")  ? (<Layout><AddList/></Layout>) : (<Navigate replace to={"/login"}/>)} />
          <Route path="/product"  element={localStorage.getItem("authToken")  ? (<Layout><Product/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/addproduct"  element={localStorage.getItem("authToken")  ? (<Layout><Add_Product/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/assetadd" element={localStorage.getItem("authToken")  ? (<Layout><AssetAdd/></Layout>) : (<Navigate replace to={"/login"}/>)} /> 
          <Route path="/profile"  element={localStorage.getItem("authToken")  ? (<Layout><ProfileSection/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/location"  element={localStorage.getItem("authToken")  ? (<Layout><Location/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/vendor"  element={localStorage.getItem("authToken")  ? (<Layout><Vendor/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/addvendor"  element={localStorage.getItem("authToken")  ? (<Layout><Add_Vendor/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/editvendor/:id"  element={localStorage.getItem("authToken")  ? (<Layout><Edit_Vendor/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/edit/:departmentId"  element={localStorage.getItem("authToken")  ? (<Layout><EditDepartment/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/vendordetails/:id" element={localStorage.getItem("authToken")  ? (<Layout><Vendor_details/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/employees/:id" element={localStorage.getItem("authToken") ? (<Layout><EditEmployee/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/location/edit/:id"  element={localStorage.getItem("authToken")  ? (<Layout><EditLocation/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/editproduct/:id" element={localStorage.getItem("authToken")  ? <Layout><EditProduct/></Layout> : (<Navigate replace to={"/login"}/>)}/>
          <Route path="/editasset/:id"  element={localStorage.getItem("authToken")  ? (<Layout><EditAsset/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          {/* Assigned Assets */}
          <Route path="/assign-asset-add"  element={localStorage.getItem("authToken")  ? (<Layout><AssignAssetsAdd/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/assignassets"  element={localStorage.getItem("authToken")  ? (<Layout><AssignAssets/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/editassignedasset/:id" element={localStorage.getItem("authToken")  ? (<Layout><EditAssignedAssets/></Layout>) : (<Navigate replace to={"/login"}/>)} />
          <Route path="/returnassignedasset/:id"  element={localStorage.getItem("authToken")  ? (<Layout><ReturnAssignedAssets/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/returnedassets" element={localStorage.getItem("authToken")  ? (<Layout><ReturnedAssets/></Layout>) : (<Navigate replace to={"/login"}/>)} />
          <Route path="/repairassignedasset/:id"  element={localStorage.getItem("authToken")  ? (<Layout><RepairAssignedAssets/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/repairassets"  element={localStorage.getItem("authToken")  ? (<Layout><RepairAssets/></Layout>) : (<Navigate replace to={"/login"}/>)}  />

          <Route path="/viewassignasset/:id"  element={localStorage.getItem("authToken")  ? (<Layout><ViewAssignAsset/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/assignedit/:id"  element={localStorage.getItem("authToken")  ? (<Layout><AssignAssetEdit/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/assignlist/"  element={localStorage.getItem("authToken")  ? (<Layout><AssignAssetList/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/assignshow/"  element={localStorage.getItem("authToken")  ? (<Layout><AssignListShow/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/new-purchase"  element={localStorage.getItem("authToken")  ? (<Layout><NewPurchase/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path="/new-subscription"  element={localStorage.getItem("authToken")  ? (<Layout><NewSubscription/></Layout>) : (<Navigate replace to={"/login"}/>)}  />
          <Route path='*' element={<Nopage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
