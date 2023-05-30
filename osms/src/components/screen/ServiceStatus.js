import React, { useEffect, useState } from "react";
import "../css/ServiceStatus.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
function ServiceStatus({ setTitle }) {
  const [pendingStatus, setPendingStatus] = useState(true);
  const [confirmedStatus, setConfirmedStatus] = useState(false);
  const [requestsWithTechnician, setRequestsWithTechnician] = useState([]);
  const [requestsWithoutTechnician, setRequestsWithoutTechnician] = useState(
    []
  );
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  useEffect(() => {
    setTitle(`Service Status ${pendingStatus ? "-Pending" : "-Confirmed"}`);
  });
  const handlePending = () => {
    setPendingStatus(true);
    setConfirmedStatus(false);
  };
  const handleConfirmed = () => {
    setPendingStatus(false);
    setConfirmedStatus(true);
  };
  useEffect(() => {
    fetch("/api/requests/made/history", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          setRequestsWithTechnician(data.requestsWithTechnician);
          setRequestsWithoutTechnician(data.requestsWithoutTechnician);
        }
      });
  });
  return (
    <div>
      <div className="container">
        <div className="panel panel-primary dialog-panel">
          <div className="panel-heading">
            <h5>Service - Status</h5>
          </div>
          <div className="panel-body">
            <form className="form-horizontal" role="form">
              <div className="form-group">
                <div className="col-md-offset-4 col-md-3">
                  <button
                    className="btn-lg btn-danger"
                    type="button"
                    onClick={handlePending}
                  >
                    Pending
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    className="btn-lg btn-primary"
                    style={{ float: "right" }}
                    type="button"
                    onClick={handleConfirmed}
                  >
                    Confirmed
                  </button>
                </div>
              </div>

              <ul className="card-list">
                {pendingStatus &&
                  (requestsWithoutTechnician.length !== 0 ? (
                    requestsWithoutTechnician.map((pending) => {
                      return (
                        <li className="card">
                          <a className="card-description" href="#">
                            <h2>{pending.reqInfo}</h2>
                            <p>{pending.description}</p>
                          </a>
                        </li>
                      );
                    })
                  ) : (
                    <h1>No Item Left</h1>
                  ))}
                {confirmedStatus &&
                  (requestsWithTechnician.length !== 0 ? (
                    requestsWithTechnician.map((confirm) => {
                      return (
                        <li className="card">
                          <a className="card-description" href="#">
                            <h2>{confirm.reqInfo}</h2>
                            <p>{confirm.description}</p>
                          </a>
                        </li>
                      );
                    })
                  ) : (
                    <h1>No Item Left</h1>
                  ))}
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceStatus;
