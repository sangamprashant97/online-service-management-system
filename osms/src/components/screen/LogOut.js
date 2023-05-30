import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
function LogOut({ setTitle }) {
  const navigate = useNavigate();
  const { setUserLogin } = useContext(LoginContext);
  const notifyB = (msg) => toast.success(msg);
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setTitle("LogOut");
  }, []);
  return (
    <div>
      <div>
        <div className="login-page">
          <div className="form">
            <p>logout</p>
            <form className="login-form">
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  setUserLogin(false);
                  notifyB("Logged Out Successfully");
                  navigate("/");
                }}
              >
                Logout
              </button>
              <hr style={{ height: "15px", color: "white" }} />
              <button
                type="button"
                onClick={() => {
                  navigate(`/${loggedUser.admin?'admin':'user'}/${loggedUser.name}/profile`);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogOut;
