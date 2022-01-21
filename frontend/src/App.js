import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CanteenPage from "./component/CanteenSec/CanteenPage";
import CanteenSec from "./component/CanteenSec/CanteenSec";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Signup from "./component/Login/Signup";
import User from "./component/User/User";
import PaymentGateway from "./component/CheckOut/PaymentGateway";
import OrderPage from "./component/User/OrderPage";
import CreateCanteen from "./component/AdminRoutes/CreateCanteen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canteens" element={<CanteenSec />} />
        <Route path="/canteen/:id" element={<CanteenPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/createcanteen" element={<CreateCanteen />} />
      </Routes>
    </Router>
  );
};

export default App;
