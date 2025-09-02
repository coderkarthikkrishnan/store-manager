import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';
import logo from './logo.svg';
import cartimg from './cartimg.png'

export default function NavBar({ cartCount = 0 }) {
    return (
        <nav className="custom-navbar">
            <div className="nav-container">
                <NavLink className="brand" to="/"><img src={logo} alt="Logo" /></NavLink>
                <ul className="nav-links">
                    <li><NavLink to="/">Inventory</NavLink></li>
                    <li><NavLink to="/catalog">Catalog</NavLink></li>
                    <li><NavLink to="/sales">Sales</NavLink></li>
                    <li><NavLink to="/add-product">Add Product</NavLink></li>
                </ul>
                <NavLink className="cart-btn" to="/cart">
                    <img src={cartimg} alt="Cart" /><span className="cart-count">{cartCount}</span>
                </NavLink>
            </div>
        </nav>
    );
}
