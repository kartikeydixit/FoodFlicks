import React, { useState, useEffect } from "react";
import "./Login.css";
import Header from "./../Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = data;
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v2/user/register", data)
      .then((res) => {
        console.log(res.data);
        setData({
          ...data,
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      })
      .catch((error) => {
        alert("some error occured ", error);
      });
  };
  return (
    <div>
      <Header />
      <div className="formData">
        <h3>Signup Form</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
          />
          <input
            value={email}
            placeholder="Enter your Email"
            name="email"
            onChange={handleChange}
          />
          <input
            value={password}
            placeholder="Enter Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
