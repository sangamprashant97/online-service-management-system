import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AdminDashBoardRequesters() {
  const [users, setUsers] = useState([]);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);

  useEffect(() => {
    fetch("/api/admin/allusers", {
      method: "get"
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
      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">List of Requesters</div>
          <div class="sales-details">
            <ul class="details" style={{marginRight:"20px"}}>
              <li class="topic">Requester ID</li>
              {users.length !== 0
                ? users.map((user) => {
                    return (
                      <>
                        <hr />
                        <li key={user._id}>
                          <a>{user._id}</a>
                        </li>
                      </>
                    );
                  })
                : ""}
            </ul>
            <ul class="details"style={{marginRight:"20px"}}>
              <li class="topic">Name</li>
              {users.length !== 0
                ? users.map((user) => {
                    return (
                      <>
                        <hr />
                        <li key={user._id}>
                          <a>{user.name}</a>
                        </li>
                      </>
                    );
                  })
                : ""}
            </ul>
            <ul class="details">
              <li class="topic">Email</li>
              {users.length !== 0
                ? users.map((user) => {
                    return (
                      <>
                        <hr />
                        <li key={user._id}>
                          <a>{user.email}</a>
                        </li>
                      </>
                    );
                  })
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoardRequesters;
