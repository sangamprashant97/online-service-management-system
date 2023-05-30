import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UserProfile({ setTitle }) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState();
  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  useEffect(() => {
    setTitle("User Profile");
  });
  const postDetails = () => {
    fetch("/api/user/name", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
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
              <h1>Name:</h1>
              <input
               placeholder={`${loggedUser.name}`}
                type="text"
                tabindex="1"
                required
                value={name}
                autofocus
                onChange={(e) => {
                  setName(e.target.value);
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
                Update Name
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
