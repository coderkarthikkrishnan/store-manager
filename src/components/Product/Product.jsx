import React from "react";
import "./ProductCard.css";


export default function Product({ product, addToCart }) {
    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        
    };

    return (
        <div
            className={`product-card-simple ${product.stock <= 0 ? "out-of-stock-card" : ""}`}
        >
            <img src={product.image} alt={product.name} className="product-card-img" />
            <div className="product-card-body">
                <h5 className="product-card-title">{product.name}</h5>
                <p className="product-card-price">₹{product.price}</p>
                <p
                    className={`product-card-stock ${product.stock <= 0 ? "out-of-stock" : ""}`}
                >
                    Stock: {product.stock}
                </p>
                <div className="product-card-tags">
                    {(product.tags || []).join(", ")}
                </div>
                <button
                    className="custom-btn"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
            </div>
        </div>
    );
}
