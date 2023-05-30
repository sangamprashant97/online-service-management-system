import React, { useEffect, useState } from "react";
import "../css/SubmitRequest.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
function AdminRequest({ setTitle }) {
  const [startDate, setStartDate] = useState();
  //data from server
  const [requests, setRequests] = useState();
  //component controll
  const [model, setModel] = useState(true);
  //clicked request deatils
  const [ClickedRequest, setClickedRequest] = useState([]);

  // data to send back to server
  const [openById, setOpenById] = useState();
  const [DateAlloc, setDateAlloc] = useState();
  const [technicianAlloc, settechnicianAlloc] = useState();
  const [toprint, setToPrint] = useState(false);
  const [toprintData, setToPrintData] = useState([]);
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  useEffect(() => {
    setTitle("Requests");
  });
  //to get the clicked request
  const handelComponentClickToUpdate = (requestId) => {
    setModel(false);
    fetch(`/api/requests/${requestId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((request) => {
        if (request.error) {
          notifyA(request.error);
        } else {
          console.log(request);
          setClickedRequest(request);
        }
      });
  };

  //to update the opened request
  const postDetails = () => {
    fetch(`/api/requests/${openById}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        DateAlloc,
        technicianAlloc,
      }),
    })
      .then((res) => res.json())
      .then((request) => {
        if (request) {
          notifyB("Technician allocated ");
          setToPrintData(request);
          setToPrint(true);
        } else {
          notifyA("Something went wrong, please fill all fields");
        }
      });
  };
  
  //print
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    fetch("/api/admin/requests/unassigned", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((requests) => {
        if (requests.error) {
          notifyA(requests.error);
        } else {
          setRequests(requests);
        }
      });
  });

  return (
    <div>
      <div className="container">








        <div className="panel panel-primary dialog-panel">
          <div className="panel-heading no-print">
            <h5>Requests</h5>
          </div>
          <div className="panel-body" id="print-section">
            {model ? (
              <form className="form-horizontal" role="form">
                <ul className="card-list">
                  {requests && requests.length !== 0 ? (
                    requests.map((request) => {
                      return (
                        <li
                          className="card"
                          onClick={() => {
                            setOpenById(request._id);
                            handelComponentClickToUpdate(request._id);
                          }}
                        >
                          <a className="card-description" href="#">
                            <h2>{request.reqInfo}</h2>
                            <p>{request.description}</p>
                          </a>
                        </li>
                      );
                    })
                  ) : (
                    <h1>No Item Left</h1>
                  )}
                </ul>
              </form>
            ) : (
              <div class="panel-body">
                <form class="form-horizontal" role="form">
                  <div
                    class="form-group"
                    style={{ marginBottom: "0px", display: "flex" }}
                  >
                    <label
                      class="control-label col-md-2 col-md-offset-2"
                      for="id_title"
                    >
                      Request Tnfo
                    </label>
                    <div class="col-md-8" style={{ width: "500px" }}>
                      <div class="col-md-8 indent-small">
                        <div class="form-group internal">
                          <h5
                            class="form-control"
                            style={{ height: "auto", padding: "3px" }}
                          >
                            {ClickedRequest.reqInfo}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-group"
                    style={{ marginBottom: "0px", display: "flex" }}
                  >
                    <label
                      class="control-label col-md-2 col-md-offset-2"
                      for="id_title"
                    >
                      Description
                    </label>
                    <div class="col-md-8" style={{ width: "500px" }}>
                      <div class="col-md-8 indent-small">
                        <div class="form-group internal">
                          <h1
                            class="form-control"
                            style={{
                              height: "auto",
                              padding: "3px",
                              margin: "0px",
                            }}
                          >
                            {ClickedRequest.description}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-group"
                    style={{ marginBottom: "0px",marginTop:"0px", display: "flex" }}
                  >
                    <label
                      class="control-label col-md-2 col-md-offset-2"
                      for="id_title"
                    >
                      Name
                    </label>
                    <div class="col-md-8" style={{ width: "500px" }}>
                      <div class="col-md-8 indent-small">
                        <div class="form-group internal">
                          <h1
                            class="form-control"
                            style={{ height: "auto", padding: "3px" }}
                          >
                            {ClickedRequest.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-group"
                    style={{ marginBottom: "0px", display: "flex" }}
                  >
                    <label
                      class="control-label col-md-2 col-md-offset-2"
                      for="id_adults"
                    >
                      Address{" "}
                    </label>
                    <div class="col-md-8" style={{ width: "500px" }}>
                      <div class="col-md-8">
                        <div class="form-group internal">
                          <h1 class="form-control" style={{ height: " auto" }}>
                            {ClickedRequest.address1}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-group"
                    style={{ marginBottom: "0px", display: "flex" }}
                  >
                    <label
                      class="control-label col-md-2 col-md-offset-2"
                      for="id_email"
                    >
                      Contact
                    </label>
                    <div class="col-md-4"style={{ width: "325x" }}>
                      <div class="form-group internal">
                        <h1
                          class="form-control"
                          style={{ height: "auto", padding: "3px" }}
                        >
                          {ClickedRequest.email}
                        </h1>
                      </div>
                      <div class="form-group internal">
                        <h1
                          class="form-control"
                          style={{ height: "auto", padding: "3px" }}
                        >
                          {ClickedRequest.mobile}
                        </h1>
                      </div>
                    </div>
                 
                   
                  </div>
                  <div class="form-group" style={{ marginBottom: "0px" }}>
                    <div
                      class="form-group internal"
                      style={{ display: "flex" }}
                    >
                      <label
                        class="control-label col-md-2 col-md-offset-2"
                        for="id_title"
                      >
                        City
                      </label>
                      <div class="col-md-8" style={{ width: "500px" }}>
                        <div class="col-md-8 indent-small">
                          <div class="form-group internal">
                            <h1
                              class="form-control"
                              style={{ height: "auto", padding: "3px" }}
                            >
                              {ClickedRequest.city}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" style={{ marginBottom: "0px" }}>
                    <div
                      class="form-group internal"
                      style={{ display: "flex" }}
                    >
                      <label
                        class="control-label col-md-2 col-md-offset-2"
                        for="id_title"
                      >
                        State
                      </label>
                      <div class="col-md-8" style={{ width: "500px" }}>
                        <div class="col-md-8 indent-small">
                          <div class="form-group internal">
                            <h1
                              class="form-control"
                              style={{ height: "auto", padding: "3px" }}
                            >
                              {ClickedRequest.state}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" style={{ marginBottom: "0px" }}>
                    <div
                      class="form-group internal"
                      style={{ display: "flex" }}
                    >
                      <label
                        class="control-label col-md-2 col-md-offset-2"
                        for="id_title"
                      >
                        Zip Code
                      </label>
                      <div class="col-md-8" style={{ width: "500px" }}>
                        <div class="col-md-8 indent-small">
                          <div class="form-group internal">
                            <h1
                              class="form-control"
                              style={{ height: "auto", padding: "3px" }}
                            >
                              {ClickedRequest.zip}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" style={{ marginBottom: "0px" }}>
                    <div
                      class="form-group internal"
                      style={{ display: "flex" }}
                    >
                      <label
                        class="control-label col-md-2 col-md-offset-2"
                        for="id_checkin"
                      >
                        Date
                      </label>
                      <div class="col-md-8" style={{ width: "500px" }}>
                        <div class="col-md-8 indent-small">
                          <div class="form-group internal">
                            <h1
                              class="form-control"
                              style={{ height: "auto", padding: "3px" }}
                            >
                              {ClickedRequest.date}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!toprint ? (
                    <>
                      <div class="form-group" style={{ marginBottom: "0px" }}>
                        <div
                          class="form-group internal"
                          style={{ display: "flex" }}
                        >
                          <label
                            class="control-label col-md-2 col-md-offset-2"
                            for="id_title"
                          >
                            Technecian
                          </label>
                          <div class="col-md-8" style={{ width: "500px" }}>
                            <div class="col-md-8 indent-small">
                              <div class="form-group internal">
                                <input
                                  class="form-control"
                                  id="id_first_name"
                                  placeholder="Technecian"
                                  type="text"
                                  required
                                  value={technicianAlloc}
                                  onChange={(e) => {
                                    settechnicianAlloc(e.target.value);
                                  }}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group" style={{ marginBottom: "0px" }}>
                        <div
                          class="form-group internal"
                          style={{ display: "flex" }}
                        >
                          <label
                            class="control-label col-md-2 col-md-offset-2"
                            for="id_checkin"
                          >
                            DateAlloc
                          </label>
                          <div class="col-md-8" style={{ width: "500px" }}>
                            <div class="col-md-8 indent-small">
                              <div class="form-group internal">
                                <DatePicker
                                  className="form-control"
                                  id="id_request_info"
                                  placeholderText="Request Info"
                                  selected={startDate}
                                  onChange={(date) => {
                                    setStartDate(date);
                                    setDateAlloc(
                                      Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                      }).format(date)
                                    );
                                  }}
                                  dateFormat="dd/MM/yyyy"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="form-group" style={{ marginBottom: "0px" }}>
                        <div
                          class="form-group internal"
                          style={{ display: "flex" }}
                        >
                          <label
                            class="control-label col-md-2 col-md-offset-2"
                            for="id_title"
                          >
                            Technecian
                          </label>
                          <div class="col-md-8" style={{ width: "500px" }}>
                            <div class="col-md-8 indent-small">
                              <h1
                                class="form-control"
                                style={{ height: "auto" }}
                              >
                                {toprintData.technicianAlloc}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group" style={{ marginBottom: "0px" }}>
                        <div
                          class="form-group internal"
                          style={{ display: "flex" }}
                        >
                          <label
                            class="control-label col-md-2 col-md-offset-2"
                            for="id_checkin"
                          >
                            DateAlloc
                          </label>
                          <div class="col-md-8" style={{ width: "500px" }}>
                            <div class="col-md-8 indent-small">
                              <h1
                                class="form-control"
                                style={{ height: "auto" }}
                              >
                                {toprintData.DateAlloc}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                    class="form-group"
                    style={{ marginBottom: "0px", display: "flex" }}
                  >
                    <label
                      class="control-label col-md-2 col-md-offset-2"
                      for="id_title"
                    >
                      Customer Signature
                    </label>
                    <div class="col-md-8" style={{ width: "500px" }}>
                    <hr style={{ borderBottom:" 2px solid red"}}/>
                    </div>
                  </div>
                  <div
                    class="form-group"
                    style={{ marginBottom: "0px", display: "flex" }}
                  >
                    <label
                      class="control-label col-md-2 col-md-offset-2"
                      for="id_title"
                    >
                      Technecian Signature
                    </label>
                    <div class="col-md-8" style={{ width: "500px" }}>
                      <div class="col-md-8 indent-small">
                        <div class="form-group internal">
                          
                        </div>
                     
                      </div>
                      <hr style={{ borderBottom:" 2px solid red"}}/>
                    </div>
                    
                  </div>

                    </>
                  )}

                  <hr />
                  <div class="form-group" style={{ marginBottom: "0px" }}>
                    <div class="col-md-offset-4 col-md-3">
                      {!toprint && (
                        <button
                          class="btn-lg btn-primary"
                          type="button"
                          onClick={postDetails}
                        >
                          Set Technecian
                        </button>
                      )}
                      {toprint && (
                        <button
                          className="btn-lg btn-primary no-print"
                          type="button"
                          onClick={handlePrint}
                        >
                          Print
                        </button>
                      )}
                    </div>
                    <div class="col-md-3">
                      <button
                        class="btn-lg btn-danger no-print"
                        style={{ float: "right" }}
                        type="button"
                        onClick={() => {
                          setModel(true);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRequest;
