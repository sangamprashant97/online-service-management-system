import React, { useEffect, useState } from "react";
import "../css/SubmitRequest.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Delete from "./button/Delete";
import HandShake from "./button/HandShake";
import ViewComponent from "./button/ViewComponent";

function AdminProducts({ setTitle }) {
  //add product
  const [model, setModel] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState();
  const [DOP, setDOP] = useState();
  const [Total, setTotal] = useState();
  const [OEC, setOEC] = useState();
  const [SPE, setSPE] = useState();
  //product from data base
  const [products, setProducts] = useState([]);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  useEffect(() => {
    setTitle("Assets");
  });
 
  const handleDelete = (productId) => {
    if(!model){
      fetch(`/api/products/${productId}`, {
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
        } else {
          notifyA(data.error);
        }
      });
    }
  };

  const postDetails = () => {
    fetch("/api/add/products", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        Total,
        DOP,
        OCE: OEC,
        SPE,
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
      fetch("/api/admin/products", {
        method: "get",
      })
        .then((res) => res.json())
        .then((products) => {
          if (products.error) {
            notifyA(products.error);
          } else {
            setProducts(products);
          }
        });
    }
  }, [model,postDetails,handleDelete]);

  return (
    <div>
      <div class="container">
        <div class="panel panel-primary dialog-panel">
          <div class="panel-heading">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div class="title">List of Products</div>
            <div>
              {" "}
              <button
              type="button"
              class="btn-lg btn-danger"
              onClick={() => {
                setModel(!model);
              }}
            >
              {!model ? "Add Product" : "Cancel"}
            </button>
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
                    Product Name
                  </label>
                  <div class="col-md-8">
                    <div class="col-md-8 indent-small">
                      <div class="form-group internal">
                        <input
                          class="form-control"
                          id="id_first_name"
                          placeholder="Product Name"
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
                      for="id_checkin"
                    >
                      Date of Production
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
                              setDOP(
                                new Intl.DateTimeFormat("en-US", {
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

                <div class="form-group">
                  <div class="form-group internal">
                    <label
                      class="control-label col-md-2 col-md-offset-2"
                      for="id_title"
                    >
                      Total
                    </label>
                    <div class="col-md-8">
                      <div class="col-md-8 indent-small">
                        <div class="form-group internal">
                          <input
                            class="form-control"
                            id="id_first_name"
                            placeholder="Tortal Stock Avilable"
                            type="text"
                            required
                            value={Total}
                            onChange={(e) => {
                              setTotal(e.target.value);
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
                      Original Cost Each
                    </label>
                    <div class="col-md-8">
                      <div class="col-md-8 indent-small">
                        <div class="form-group internal">
                          <input
                            class="form-control"
                            id="id_first_name"
                            placeholder="Original Price Each"
                            type="text"
                            required
                            value={OEC}
                            onChange={(e) => {
                              setOEC(e.target.value);
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
                      Selling Price Each
                    </label>
                    <div class="col-md-8">
                      <div class="col-md-8 indent-small">
                        <div class="form-group internal">
                          <input
                            class="form-control"
                            id="id_first_name"
                            placeholder="
                            Selling Price Each"
                            type="Number"
                            required
                            value={SPE}
                            onChange={(e) => {
                              setSPE(e.target.value);
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
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <div class="sales-boxes" style={{ marginRight: "5%" }}>
                  <div class="recent-sales box">
                    <div class="title">List of Products</div>
                    <div class="sales-details">
                      <ul class="details">
                        <li class="topic">Name</li>
                        {products.length !== 0
                          ? products.map((product) => {
                              return (
                                <>
                                  <hr />
                                  <li key={product._id}>
                                    <a>{product.name}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">DOP</li>
                        {products.length !== 0
                          ? products.map((product) => {
                              return (
                                <>
                                  <hr />
                                  <li key={product._id}>
                                    <a>{product.DOP}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">Avilable</li>
                        {products.length !== 0
                          ? products.map((product) => {
                              return (
                                <>
                                  <hr />
                                  <li key={product._id}>
                                    <a>{product.Available}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">Total</li>
                        {products.length !== 0
                          ? products.map((products) => {
                              return (
                                <>
                                  <hr />
                                  <li key={products._id}>
                                    <a>{products.Total}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">OC</li>
                        {products.length !== 0
                          ? products.map((product) => {
                              return (
                                <>
                                  <hr />
                                  <li key={product._id}>
                                    <a>{product.OCE}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">SP</li>
                        {products.length !== 0
                          ? products.map((product) => {
                              return (
                                <>
                                  <hr />
                                  <li key={products._id}>
                                    <a>{product.SPE}</a>
                                  </li>
                                </>
                              );
                            })
                          : ""}
                      </ul>
                      <ul class="details">
                        <li class="topic">Action</li>
                        {products.length !== 0
                          ? products.map((product) => {
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
                                      onClick={()=>{handleDelete(product._id)}}
                                      
                                    >
                                      <Delete />
                                    </button>
                                    <button
                                      className=" Product-button "
                                      type="button"
                                    >
                                      <ViewComponent />
                                    </button>
                                    <button
                                      className=" Product-button "
                                      type="button"
                                    >
                                      <HandShake />
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
              </div>
            )}
          </div>
        </div>
      </div>
   
  );
}

export default AdminProducts;
