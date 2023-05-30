import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AdminWorkOrder() {
  const [users, setUsers] = useState([]);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);

  useEffect(() => {
    fetch("/api/admin/workdone", {
      method: "get",
    })
      .then((res) => res.json())
      .then((users) => {
        if (users.error) {
          notifyA(users.error);
        } else {
          setUsers(users);
        }
      });
  }, []);

  return (
    <div>
      <div class="sales-boxes" style={{ marginRight: "5%" }}>
        <div class="recent-sales box">
          <div class="title">List of Request Done </div>
          <div className="container">
            <div className="panel-body">
              <form className="form-horizontal" role="form">
                <ul className="card-list">
                  {users.length !== 0
                    ? users.map((user) => {
                        return (
                          <li className="card"style={{width:"260px"}} >
                            <a className="card-description" >
                              <div style={{ display: "flex" }}>
                                <p className =" heading-of-details ">Name:</p>
                                <h2>{user.name}</h2>
                              </div>
                              <hr/>
                              <div style={{ display: "flex" }}>
                                <p className =" heading-of-details ">
                                  Request info:
                                </p>
                                <h2>{user.reqInfo}</h2>
                              </div>  <hr/>
                              <div style={{ display: "flex" }}>
                                <p className =" heading-of-details ">Address:</p>
                                <h2>{user.address1}</h2>
                              </div>  <hr/>
                              <div style={{ display: "flex" }}>
                                <p className =" heading-of-details ">
                                 Ctiy:
                                </p>
                                <h2>{user.city}</h2>
                              </div>  <hr/>
                              <div style={{ display: "flex" }}>
                                <p className =" heading-of-details ">
                                 Mobile Number
                                </p>
                                <h2>{user.mobile}</h2>
                              </div>  <hr/>
                              <div style={{ display: "flex" }}>
                                <p className =" heading-of-details ">
                                Technician :
                                </p>
                                <h2>{user.technicianAlloc}</h2>
                              </div>  <hr/>
                              <div style={{ display: "flex" }}>
                                <p className =" heading-of-details ">
                                Date of Allocation :
                                </p>
                                <h2>{user.DateAlloc}</h2>
                              </div>  <hr/>
                             
                            </a>
                          </li>
                        );
                      })
                    : ""}
                </ul>
              </form>
            </div>
          </div>
          <div class="sales-details"></div>
        </div>
      </div>
    </div>
  );
}
export default AdminWorkOrder;
