import React, { useMemo, useState } from "react";
import Product from "./Product";
import "./Inventory.css";

export default function Inventory({ products, updateStock, removeProduct }) {
    const [q, setQ] = useState("");
    const [threshold, setThreshold] = useState(3);

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        if (!query) return products;
        return products.filter((p) => {
            const inName = p.name.toLowerCase().includes(query);
            const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(query));
            return inName || inTags;
        });
    }, [q, products]);

    return (
        <div className="inventory-container">
            
            <div className="inventory-controls">
                <div className="search-box">
                    <label>Search products</label>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Name or tag..."
                    />
                </div>
                <div className="threshold-box">
                    <label>Low-stock alert ≤</label>
                    <input
                        type="number"
                        min="0"
                        value={threshold}
                        onChange={(e) => setThreshold(+e.target.value || 0)}
                    />
                </div>
                
            </div>

            {filtered.length === 0 ? (
                <p className="no-results">No products match your search.</p>
            ) : (
                <div className="product-grid">
                    {filtered.map((p) => (
                        <Product
                            key={p.id}
                            product={p}
                            threshold={threshold}
                            updateStock={updateStock}
                            removeProduct={removeProduct}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
