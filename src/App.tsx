import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./components/Home.tsx";
import Customer from "./components/Customer.tsx";
import Product from "./components/Product.tsx";
import Order from "./components/Order.tsx";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Calculator from "./components/Calculator.tsx";

function App() {

  return (
    <Router>
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar-brand" >
                        <img alt={"logo"} className="logo" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Wattpad_logo.png/1600px-Wattpad_logo.png"}/>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/customer">Customer</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/order">Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/product">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/calc">Calculator</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/customer" element={<Customer/>}/>
                <Route path="/product" element={<Product/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/calc" element={<Calculator/>}/>
            </Routes>
        </div>
    </Router>
  )
}

export default App
