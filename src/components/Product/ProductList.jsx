import React from "react";
import Product from "./Product"; // use the updated Product.jsx
import "./ProductList.css";

export default function ProductList({ products, addToCart, threshold = 3 }) {
    return (
        <div className="product-grid-list">
            {products.map((p) => (
                <div key={p.id} className="product-grid-item">
                    <Product
                        product={p}
                        addToCart={addToCart}
                        threshold={threshold}
                    />
                </div>
            ))}
        </div>
    );
}
