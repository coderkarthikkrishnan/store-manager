import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2 className="footer-logo">🛒 Inv Track</h2>
                    <p className="footer-desc">
                        Quality products, curated for you. Shop smart, live better.
                    </p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Inventory</a></li>
                        <li><a href="/catalog">Catalog</a></li>
                        <li><a href="/cart">Cart</a></li>
                        <li><a href="/contact">Sales</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>Email: gskarthikkrishnan@gmail.com</p>
                    <p>Phone: +91 7305962714</p>

                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} InvTrack. All rights reserved.</p>
            </div>
        </footer>
    );
}
