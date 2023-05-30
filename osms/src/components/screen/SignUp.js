import React, { useEffect, useState } from "react";
import "../css/Log.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp({ setTitle }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const { type } = useParams();

  useEffect(() => {
    setTitle("SignUp");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sending data to server
    fetch(`/api/${type}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate(`/user/signin`);
        }
        console.log(data);
      });
  };

  return (
    <div>
      <div class="login-page">
        <div class="form">
          <p>{type} SignUp</p>
          <form class="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              placeholder="Full name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button type="submit">Submit</button>
            <p class="message">
              Already registered? <Link to="/">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
