import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Delete from "./button/Delete";
import ViewComponent from "./button/ViewComponent";
import HandShake from "./button/HandShake";

function AdminRequestersNavFetch() {
  const [users, setUsers] = useState([]);
  const [model, setModel] = useState(false);
  const [userName, setUserName] = useState();
  const [Password, setPassword] = useState();
  const [Email, setEmail] = useState();

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  //delete user

  const handleDelete = (userID) => {
    if (!model) {
      fetch(`/api/user/delete/${userID}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            notifyB(data.message);
            setEmail("");
            setUserName("");
            setPassword("");
          } else {
            notifyA(data.error);
          }
        });
    }
  };
  //add user
  const postDetails = () => {
    fetch("/api/admin/user/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name: userName,
        email: Email,
        password: Password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          notifyB(data.message);
        } else {
          notifyA(data.error);
        }
      });
  };

  useEffect(() => {
    if (!model) {
      fetch("/api/admin/allusers", {
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
    }
  }, [postDetails, model]);

  return (
    <div>
      <div class="sales-boxes" style={{ marginRight: "5%" }}>
        <div class="recent-sales box">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div class="title">
              {!model ? "List of Requesters" : "Enter User's Details"}
            </div>
            <div>
              {" "}
              <button
                class={`btn-lg ${model ? "btn-danger" : "btn-primary"}`}
                onClick={() => {
                  setModel(!model);
                }}
              >
                {!model ? "Add User" : "Cancel"}
              </button>
            </div>
          </div>
          <hr />
          {!model ? (
            <div class="sales-details" >
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
              <ul class="details">
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
                <li class="topic">Action</li>
                {users.length !== 0
                  ? users.map((user) => {
                      return (
                        <>
                          <hr />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "sapce-around",
                            }}
                          >
                            <button
                              className=" Product-button "
                              type="button"
                              onClick={() => {
                                handleDelete(user._id);
                              }}
                            >
                              <Delete />
                            </button>
                          </div>
                        </>
                      );
                    })
                  : ""}
              </ul>
            </div>
          ) : (
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label
                  class="control-label col-md-2 col-md-offset-2"
                  for="id_title"
                >
                  User Name
                </label>
                <div class="col-md-8">
                  <div class="col-md-8 indent-small">
                    <div class="form-group internal">
                      <input
                        class="form-control"
                        id="id_first_name"
                        placeholder="User's Name"
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="form-group internal">
                  <label
                    class="control-label col-md-2 col-md-offset-2"
                    for="id_title"
                  >
                    Email
                  </label>
                  <div class="col-md-8">
                    <div class="col-md-8 indent-small">
                      <div class="form-group internal">
                        <input
                          class="form-control"
                          id="id_first_name"
                          placeholder="Email"
                          type="email"
                          required
                          value={Email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="form-group internal">
                  <label
                    class="control-label col-md-2 col-md-offset-2"
                    for="id_title"
                  >
                    Password
                  </label>
                  <div class="col-md-8">
                    <div class="col-md-8 indent-small">
                      <div class="form-group internal">
                        <input
                          class="form-control"
                          id="id_first_name"
                          placeholder="Password"
                          type="text"
                          required
                          value={Password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div class="form-group">
                <div class="col-md-offset-4 col-md-3">
                  <button
                    class="btn-lg btn-primary"
                    type="button"
                    onClick={postDetails}
                  >
                    Add User
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
export default AdminRequestersNavFetch;
