import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { Order } from "./pages/Order";

const App = () => {
  const [orders, setOrders] = useState([]);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home orders={orders} setOrders={setOrders}/>} />
        <Route path="/order" element={<Order orders={orders}/>} />
      </Routes>
    </Router>
  )
}

export default App;
