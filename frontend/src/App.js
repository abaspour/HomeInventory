import React, { useState} from 'react'
import {
  BrowserRouter as Router,
  Routes, // instead of "Switch"
  Route,
  useParams,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/user-navbar.component';
import Profile from './components/profile/user-profile.component';
import InventoryItemsList from './components/Inventory/inventoryItemslist.component'
import CreateInventory from './components/Inventory/inventoryCreate.components';
import UpdateInventory from './components/Inventory/inventoryUpdate.components';
import CategoryList from './components/category/categories-list.component';
import EditCategory from './components/category/edit-category.component';

import Login from './components/authenticate/login';
import Logoff from './components/authenticate/logoff';
import Register from './components/authenticate/Register';
import UsersList from './components/profile/userlist.component';
import AdminCreateUser from './components/profile/admin-createUser';
import AdminEditProfile from './components/profile/admin-editprofile.component';


const ChildEdit = (props) => {
  const { id } = useParams();

  return (
    <div>
      <UpdateInventory id={id} user={props.user}   />
    </div>
  );
};

const ChildEditCategory = (props) => {
  const { id } = useParams();

  return (
    <div>
      <EditCategory id={id}  user={props.user}  />
    </div>
  );
};

const ChildAdminEditProfile = (props) => {
  const { id } = useParams();

  return (
    <div>
      <AdminEditProfile id={id}  user={props.user}  />
    </div>
  );
};

function App() {
  const userSession=JSON.parse(sessionStorage.getItem('user'));
  const [user,setUser]=useState({
    _id: userSession?._id,
    firstName: userSession?.firstName,
    lastName: userSession?.lastName,
    email: userSession?.email,
    phoneNumber: userSession?.phoneNumber, 
    status: userSession?.status,
    role: userSession?.role ,
    token: userSession?.token
  });

  const setSession= (user)=>{
    sessionStorage.setItem('user',JSON.stringify(user));
    setUser(user);
  }   

  return (
      <Router>
      <div className='container'>
        <Navbar user={user}/>
        <Routes>
        <Route path="/user/:id" element={<Profile  user={user} setUser={setSession} />} />
        <Route path="/user" element={<Profile  user={user} setUser={setSession} />} />
        <Route path="/inventory-add" element={<CreateInventory  user={user}  />} />
        <Route path="/inventory-edit/:id" element={<ChildEdit user={user} />} />
        <Route path="/category" element={<CategoryList  user={user}/>} />
        <Route path="/category-edit/:id" element={<ChildEditCategory  user={user}/>} />
        <Route path="/login" element={<Login user={user} setUser={setSession} />} />
        <Route path="/logoff" element={<Logoff  user={user} setUser={setSession} />} />
        <Route path="/register" element={<Register  user={user} setUser={setSession} />} />
        <Route path="/user-list" element={<UsersList  user={user}  />} />
        <Route path="/admin-create-user/" element={<AdminCreateUser  user={user}  />} />
        <Route path="/admin-edit-profile/:id" element={<ChildAdminEditProfile  user={user}  />} />
        <Route path="/" element={<InventoryItemsList user={user} setUser={setSession} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
