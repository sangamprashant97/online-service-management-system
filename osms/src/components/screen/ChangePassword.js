import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";

function ChangePassword({ setTitle }) {

  const [newPassword, setNewPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const { type } = useParams();

  useEffect(() => {
    setTitle("Change Password");
  });
  const postDetails = () => {
    fetch(`/api/${type}/password`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        newPassword,
        currentPassword: oldPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          notifyB(data.message);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          notifyA(data.error);
        }
      });
  };
  return (
    <div>
      <section>
        <div class="container">
          <form id="contact">
            <fieldset>
              <h1>Email:</h1>
              <input
                placeholder={`${loggedUser.email}`}
                type="email"
                tabindex="2"
                disabled
              />
            </fieldset>
            <fieldset>
              <h1>Old Password:</h1>
              <input
                placeholder="Enter Your Old Password"
                type="text"
                tabindex="1"
                required
                autofocus
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </fieldset>
            <fieldset>
              <h1>New Password:</h1>
              <input
                placeholder="Enter Your New Password"
                type="text"
                tabindex="1"
                required
                autofocus
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </fieldset>
            <fieldset>
              <button
                name="submit"
                type="button"
                id="contact-submit"
                data-submit="...Sending"
                onClick={postDetails}
              >
                Update Password
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ChangePassword;
