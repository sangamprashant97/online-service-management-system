import React, { useEffect, useState } from "react";
import "../css/SubmitRequest.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Delete from "./button/Delete";
import ViewComponent from "./button/ViewComponent";

function AdminTechnicians({ setTitle }) {
  //model
  const [model, setModel] = useState(false);
  const [editModel, setEditmodel] = useState(false);
  //technician add
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [city, setCity] = useState();
  //to get selected technician
  const [selectedName, setSelectedName] = useState();
  const [selectedEmail, setSelectedEmail] = useState();
  const [selectedMobile, setSelectedMobile] = useState();
  const [selectedcity, setSelectedCity] = useState();
  const [TechnicianSelectedId, setTechnicianSelectedId] = useState();
  //product from data base
  const [Technicians, setTechnicians] = useState([]);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  useEffect(() => {
    setTitle("Assets");
  });

  const handleUpdate = (techniciansId) => {
    if (!editModel) {
      fetch(
        `/api/admin/get/one/technician/${techniciansId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
        .then((res) => res.json())
        .then((technician) => {
          if (technician) {
            setSelectedName(technician.name);
            setSelectedEmail(technician.email);
            setSelectedMobile(technician.mobile);
            setSelectedCity(technician.city);
          } else {
            notifyA("Someting Went Wrong");
          }
        });
    }
  };

  //edit the selected Technician
  const postEditedDetails = () => {
    fetch(
      `/api/admin/edit/technicians/${TechnicianSelectedId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          name: selectedName,
          email: selectedEmail,
          city: selectedcity,
          mobile: selectedMobile,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          notifyB(data.message);
        } else {
          notifyA(data.error);
        }
      });
  };

  const handleDelete = (techniciansId) => {
    if (!model) {
      fetch(
        `/api/admin/delete/technicians/${techniciansId}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            notifyB(data.message);
          } else {
            notifyA(data.error);
          }
        });
    }
  };

  const postDetails = () => {
    fetch("/api/admin/add/technicians", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        email,
        city,
        mobile,
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

  //get data fron server
  useEffect(() => {
    if (!model) {
      fetch("/api/admin/get/technicians", {
        method: "get",
      })
        .then((res) => res.json())
        .then((technicians) => {
          if (technicians) {
            setTechnicians(technicians);
          } else {
            notifyA("Somethin went wrong");
          }
        });
    }
  }, [model, postDetails, handleDelete]);

  return (
    <div>
      <div class="container">
        <div class="panel panel-primary dialog-panel">
          <div class="panel-heading">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div class="title">List of Technicians</div>
              <div>
                {!model && !editModel ? (
                  <button
                    type="button"
                    class="btn-lg btn-ternery"
                    onClick={() => {
                      setModel(true);
                    }}
                  >
                    Add Technician
                  </button>
                ) : !editModel ? (
                  <button
                    type="button"
                    class="btn-lg btn-danger"
                    onClick={() => {
                      setModel(false);
                    }}
                  >
                    Cancel add
                  </button>
                ) : (
                  <button
                    type="button"
                    class="btn-lg btn-danger"
                    onClick={() => {
                      setEditmodel(false);
                    }}
                  >
                    Cancel edit{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
          <hr />
          {model ? (
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label
                  class="control-label col-md-2 col-md-offset-2"
                  for="id_title"
                >
                  Technician Name
                </label>
                <div class="col-md-8">
                  <div class="col-md-8 indent-small">
                    <div class="form-group internal">
                      <input
                        class="form-control"
                        id="id_first_name"
                        placeholder="Technician Name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
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
                          placeholder="Enter Email  "
                          type="email"
                          required
                          value={email}
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
                    Mobile
                  </label>
                  <div class="col-md-8">
                    <div class="col-md-8 indent-small">
                      <div class="form-group internal">
                        <input
                          class="form-control"
                          id="id_first_name"
                          placeholder=" Enter Mobile Number"
                          type="number"
                          required
                          value={mobile}
                          onChange={(e) => {
                            setMobile(e.target.value);
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
                    City
                  </label>
                  <div class="col-md-8">
                    <div class="col-md-8 indent-small">
                      <div class="form-group internal">
                        <input
                          class="form-control"
                          id="id_first_name"
                          placeholder="
                              Enter City"
                          type="text"
                          required
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
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
                    Add Technician
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              {!editModel ? (
                <div class="sales-boxes" style={{ marginRight: "5%" }}>
                  <div class="recent-sales box">
                    <div class="title">List of Products</div>
                    <div class="sales-details">
                      <ul class="details">
                        <li class="topic">Name</li>
                        {Technicians.length !== 0
                          ? Technicians.map((Technician) => {
                              return (
                                <>
                                  <hr />
                                  <li key={Technician._id}>
                                    <a>{Technician.name}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">City</li>
                        {Technicians.length !== 0
                          ? Technicians.map((Technician) => {
                              return (
                                <>
                                  <hr />
                                  <li key={Technician._id}>
                                    <a>{Technician.city}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">Mobile</li>
                        {Technicians.length !== 0
                          ? Technicians.map((Technician) => {
                              return (
                                <>
                                  <hr />
                                  <li key={Technician._id}>
                                    <a>{Technician.mobile}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">Email</li>
                        {Technicians.length !== 0
                          ? Technicians.map((Technician) => {
                              return (
                                <>
                                  <hr />
                                  <li key={Technician._id}>
                                    <a>{Technician.email}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">Action</li>
                        {Technicians.length !== 0
                          ? Technicians.map((Technician) => {
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
                                        handleDelete(Technician._id);
                                      }}
                                    >
                                      <Delete />
                                    </button>
                                    <button
                                      className=" Product-button "
                                      type="button"
                                      onClick={() => {
                                        setEditmodel(true);
                                        setTechnicianSelectedId(Technician._id);
                                        handleUpdate(Technician._id);
                                      }}
                                    >
                                      <ViewComponent />
                                    </button>
                                  </div>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <form class="form-horizontal" role="form">
                  <div class="form-group">
                    <label
                      class="control-label col-md-2 col-md-offset-2"
                      for="id_title"
                    >
                      Technician Name
                    </label>
                    <div class="col-md-8">
                      <div class="col-md-8 indent-small">
                        <div class="form-group internal">
                          <input
                            class="form-control"
                            id="id_first_name"
                            placeholder={selectedName}
                            type="text"
                            required
                            value={selectedName}
                            onChange={(e) => {
                              setSelectedName(e.target.value);
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
                              placeholder={selectedEmail}
                              type="email"
                              required
                              value={selectedEmail}
                              onChange={(e) => {
                                setSelectedEmail(e.target.value);
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
                        Mobile
                      </label>
                      <div class="col-md-8">
                        <div class="col-md-8 indent-small">
                          <div class="form-group internal">
                            <input
                              class="form-control"
                              id="id_first_name"
                              placeholder={selectedMobile}
                              type="number"
                              required
                              value={selectedMobile}
                              onChange={(e) => {
                                setSelectedMobile(e.target.value);
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
                        City
                      </label>
                      <div class="col-md-8">
                        <div class="col-md-8 indent-small">
                          <div class="form-group internal">
                            <input
                              class="form-control"
                              id="id_first_name"
                              placeholder={selectedcity}
                              type="text"
                              required
                              value={selectedcity}
                              onChange={(e) => {
                                setSelectedCity(e.target.value);
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
                        onClick={postEditedDetails}
                      >
                        Edit Technician
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminTechnicians;
