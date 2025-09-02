import React, { useMemo, useState } from "react";
import ProductList from "./ProductList";
import "./ProductCatalog.css";

export default function ProductCatalog({ products, addToCart }) {
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return products;
        return products.filter(
            (p) =>
                p.name.toLowerCase().includes(s) ||
                (p.tags || []).some((t) => t.toLowerCase().includes(s))
        );
    }, [q, products]);

    return (
        <div className="catalog-container">
            <div className="catalog-header">
                <h4 className="catalog-title">Product Catalog</h4>
                <input
                    className="catalog-search"
                    placeholder="Search by name or tag..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            </div>
            <ProductList products={filtered} addToCart={addToCart} />
        </div>
    );
}
