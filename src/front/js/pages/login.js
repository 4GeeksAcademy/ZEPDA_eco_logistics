import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [isShow, setIsShown] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_check: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    store.token && navigate("/private");
    return () => {
      setUser({
        name: "",
        email: "",
        password: "",
        password_check: "",
      });
    };
  }, [store.token, navigate]);

  const registerUser = async () => {
    if (user.password === user.password_check && user.password !== "") {
      const createUser = await actions.createUser(user);
      if (createUser) {
        toggleModal("User was created successfully!");
        setUser({
          ...user,
          name: "",
          email: "",
          password: "",
          password_check: "",
        });
        setIsShown(!isShow);
      } else {
        toggleModal("An unexpected error occurred.");
      }
    } else {
      toggleModal("Passwords do not match!");
      setUser({ ...user, password: "", password_check: "" });
    }
  };

  const loginCustomer = async () => {
    const login = await actions.loginUser(user);
    if (login) {
      toggleModal("Login was successful!");
      setTimeout(() => navigate("/private"), 1500);
    } else {
      toggleModal("Unable to login. Please check your credentials.");
      setUser({
        ...user,
        password: "",
      });
    }
  };

  return (
    <div className="login-form">
      <section onSubmit={(e) => e.preventDefault()}>
        {!isShow ? <h1>Login</h1> : <h1>Register</h1>}
        <div className="content">
          {isShow && (
            <div className="input-field">
              <input
                type="text"
                value={user.name}
                placeholder="Name"
                autoComplete="off"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
          )}
          <div className="input-field">
            <input
              type="email"
              value={user.email}
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              value={user.password}
              placeholder="Password"
              autoComplete="new-password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          {isShow && (
            <div className="input-field">
              <input
                type="password"
                value={user.password_check}
                placeholder="Repeat Password"
                autoComplete="new-password"
                onChange={(e) =>
                  setUser({ ...user, password_check: e.target.value })
                }
              />
            </div>
          )}
        </div>
        <div className="action">
          <button
            className={!isShow ? "" : "selected"}
            onClick={() => (isShow ? registerUser() : setIsShown(!isShow))}
          >
            Register
          </button>
          <button
            className={isShow ? "" : "selected"}
            onClick={() => (!isShow ? loginCustomer() : setIsShown(!isShow))}
          >
            Sign in
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p style={styles.modalText}>{modalMessage}</p>
            <button style={styles.closeButton} onClick={() => toggleModal("")}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the modal
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px 30px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    maxWidth: "400px",
    width: "100%",
  },
  modalText: {
    marginBottom: "15px",
    fontSize: "16px",
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Login;

