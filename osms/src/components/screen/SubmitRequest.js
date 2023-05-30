import React, { useEffect, useState } from "react";
import "../css/SubmitRequest.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
function SubmitRequest({ setTitle }) {
  const [startDate, setStartDate] = useState(new Date());
  const [reqInfo, setReqInfo] = useState();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [datef, setDate] = useState();
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  useEffect(() => {
    setTitle("Submit Request");
  });
  const postDetails = () => {
    fetch("/api/user/request/make", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        reqInfo,
        description,
        name,
        address1,
        address2,
        city,
        state,
        zip,
        email,
        mobile,
        date: datef,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          notifyB(data.message);
          setReqInfo("");
          setDescription("");
          setName("");
          setAddress1("");
          setAddress2("");
          setCity("");
          setState("");
          setZip("");
          setEmail("");
          setMobile("");
          setDate("");
        } else {
          notifyA(data.error);
        }
      });
  };
  return (
    <div>
      <div class="container">
        <div class="panel panel-primary dialog-panel">
          <div class="panel-heading">
            <h5>Request - Form</h5>
          </div>
          <div class="panel-body">
            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label
                  class="control-label col-md-2 col-md-offset-2"
                  for="id_title"
                >
                  Request Tnfo
                </label>
                <div class="col-md-8">
                  <div class="col-md-8 indent-small">
                    <div class="form-group internal">
                      <input
                        class="form-control"
                        id="id_first_name"
                        placeholder="Request Info"
                        type="text"
                        required
                        value={reqInfo}
                        onChange={(e) => {
                          setReqInfo(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label
                  class="control-label col-md-2 col-md-offset-2"
                  for="id_title"
                >
                  Description
                </label>
                <div class="col-md-8">
                  <div class="col-md-8 indent-small">
                    <div class="form-group internal">
                      <input
                        class="form-control"
                        id="id_first_name"
                        placeholder="Write Description"
                        type="text"
                        required
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label
                  class="control-label col-md-2 col-md-offset-2"
                  for="id_title"
                >
                  Name
                </label>
                <div class="col-md-8">
                  <div class="col-md-8 indent-small">
                    <div class="form-group internal">
                      <input
                        class="form-control"
                        id="id_first_name"
                        placeholder="Name"
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
                <label
                  class="control-label col-md-2 col-md-offset-2"
                  for="id_adults"
                >
                  Address{" "}
                </label>
                <div class="col-md-8">
                  <div class="col-md-4">
                    <div class="form-group internal">
                      <input
                        class="form-control col-md-8"
                        id="id_adults"
                        placeholder="Address Line 1"
                        type="text"
                        required
                        value={address1}
                        onChange={(e) => {
                          setAddress1(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  <div class="col-md-4 indent-small">
                    <div class="form-group internal">
                      <input
                        class="form-control"
                        id="id_children"
                        placeholder="Address Line 2 "
                        type="text"
                        required
                        value={address2}
                        onChange={(e) => {
                          setAddress2(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label
                  class="control-label col-md-2 col-md-offset-2"
                  for="id_email"
                >
                  Contact
                </label>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="col-md-11">
                      <input
                        class="form-control"
                        id="id_email"
                        placeholder="E-mail"
                        type="text"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  <div class="form-group internal">
                    <div class="col-md-11">
                      <input
                        class="form-control"
                        id="id_phone"
                        placeholder="Phone: (xxx) - xxx xxxx"
                        type="text"
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
                          placeholder="City"
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
              <div class="form-group">
                <div class="form-group internal">
                  <label
                    class="control-label col-md-2 col-md-offset-2"
                    for="id_title"
                  >
                    State
                  </label>
                  <div class="col-md-8">
                    <div class="col-md-8 indent-small">
                      <div class="form-group internal">
                        <input
                          class="form-control"
                          id="id_first_name"
                          placeholder="State"
                          type="text"
                          required
                          value={state}
                          onChange={(e) => {
                            setState(e.target.value);
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
                    Zip Code
                  </label>
                  <div class="col-md-8">
                    <div class="col-md-8 indent-small">
                      <div class="form-group internal">
                        <input
                          class="form-control"
                          id="id_first_name"
                          placeholder="Zip Code"
                          type="Number"
                          required
                          value={zip}
                          onChange={(e) => {
                            setZip(e.target.value);
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
                    for="id_checkin"
                  >
                    Date
                  </label>
                  <div class="col-md-8">
                    <div class="col-md-8 indent-small">
                      <div class="form-group internal">
                        <DatePicker
                          className="form-control"
                          id="id_request_info"
                          placeholderText="Request Info"
                          selected={startDate}
                          onChange={(date) => {
                            setStartDate(date);
                            setDate(date);
                          }}
                          dateFormat="dd/MM/yyyy"
                          required
                        />
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
                    Request
                  </button>
                </div>
                <div class="col-md-3">
                  <button
                    class="btn-lg btn-danger"
                    style={{ float: "right" }}
                    type="submit"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitRequest;
