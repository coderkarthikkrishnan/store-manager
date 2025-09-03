import React, { useState } from "react";
import "./Product.css";

export default function Product({ product, updateStock, removeProduct, threshold = 3 }) {
    const [newStock, setNewStock] = useState(product.stock);
    const low = product.stock <= threshold;

    const handleStockChange = () => {
        if (newStock >= 0) {
            updateStock(product.id, newStock);
        }
    };

    return (
        <div className={`product-card ${low ? "low-stock" : ""}`}>
            <img src={product.image} alt={product.name} className="product-image" />

            <div className="product-body">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-tags">{(product.tags || []).join(", ")}</p>
                <div className="product-info">
                    <span className="product-price">₹{product.price}</span>
                    <span className={`stock-badge ${low ? "danger" : "secondary"}`}>
                        Stock: {product.stock}
                    </span>
                </div>
            </div>

            <div className="stock-update">
                <input
                    type="number"
                    value={newStock}
                    min="0"
                    onChange={(e) => setNewStock(Number(e.target.value))}
                />
                <button onClick={handleStockChange}>Update</button>
                <button
                    className="remove-btn"
                    onClick={() => removeProduct(product.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
