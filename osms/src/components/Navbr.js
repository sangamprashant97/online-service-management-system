import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./img/logo.png"

function Navbr({ login,isAdmin }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const loggedUser=JSON.parse(localStorage.getItem("user"))

  

  const loginStatus = () => {
    if (login || token) {
      return (isAdmin || loggedUser.admin)? 
         ( <>
            <li>
              <Link to={`/admin/${loggedUser.name}/dashboard`} >
                <i class="bx bx-grid-alt"></i>
                <span class="links_name">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/${loggedUser.name}/workorder`}>
                <i class="bx bx-book-alt"></i>
                <span class="links_name">work order</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/${loggedUser.name}/request`} >
                <i class="bx bx-user"></i>
                <span class="links_name">Request Pending</span>
              </Link>
            </li>
            <li>
            <Link to={`/admin/${loggedUser.name}/products`}>
                <i class="bx bx-cog"></i>
                <span class="links_name">Assets</span>
              </Link>
            </li>
            <li>
            <Link to={`/admin/${loggedUser.name}/technicians`}>
                <i class="bx bx-heart"></i>
                <span class="links_name">Technicians</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/${loggedUser.name}/requestrs`}>
                <i class="bx bx-cog"></i>
                <span class="links_name">Requester</span>
              </Link>
            </li>
            <li>
              <Link to={`/admin/${loggedUser.name}/changepassword`}>
                <i class="bx bx-cog"></i>
                <span class="links_name">Change Password</span>
              </Link>
            </li>
            <li class="log_out">
              <Link to="/logout">
                <i class="bx bx-log-out"></i>
                <span class="links_name">Log out</span>
              </Link>
            </li>
          </>)
       :
         ( <>
            <li>
              <Link to={`/user/${loggedUser.name}/profile`} >
                <i class="bx bx-grid-alt"></i>
                <span class="links_name">Profile</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/${loggedUser.name}/submitrequest`} >
                <i class="bx bx-box"></i>
                <span class="links_name">Submit Request</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/${loggedUser.name}/servicestatus`}>
                <i class="bx bx-list-ul"></i>
                <span class="links_name">Service Status</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/${loggedUser.name}/changepassword`}>
                <i class="bx bx-pie-chart-alt-2"></i>
                <span class="links_name">Change Password</span>
              </Link>
            </li>
            <li class="log_out">
              <Link to="/logout">
                <i class="bx bx-log-out"></i>
                <span class="links_name">Log out</span>
              </Link>
            </li>
          </>)
      
    } else {
      return [
        <>
          <li>
            <Link to="/">
              <i class="bx bx-box"></i>
              <span class="links_name">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/user/signin">
              <i class="bx bx-box"></i>
              <span class="links_name">SignIn</span>
            </Link>
          </li>
          <li>
            <Link to="/user/signup">
              <i class="bx bx-box"></i>
              <span class="links_name">SignUp</span>
            </Link>
          </li>
        </>,
      ];
    }
  };

  return (
    <div>
      <div class="logo-details no-print">
      <img style={{width:"30px",marginLeft:"30px",marginRight:'10px'}} src={logo} alt=""/>
        <span class="logo_name">OSMS</span>
      </div>
      <ul class="nav-links no-print">{loginStatus()}</ul>
    </div>
  );
}

export default Navbr;
