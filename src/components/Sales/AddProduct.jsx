import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css"; // Import our custom CSS

export default function AddProduct({ addProduct }) {
    const [form, setForm] = useState({ name: "", image: "", price: "", stock: "", tags: "" });
    const nav = useNavigate();

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.image || !form.price || !form.stock) return;
        const payload = {
            name: form.name.trim(),
            image: form.image.trim(),
            price: Number(form.price),
            stock: Number(form.stock),
            tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        };
        addProduct(payload);
        nav("/");
    };

    const resetForm = () => setForm({ name: "", image: "", price: "", stock: "", tags: "" });

    return (
        <div className="add-product-container">
            <h4 className="form-title">Add Product</h4>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <label>Name</label>
                    <input name="name" value={form.name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input name="image" value={form.image} onChange={onChange} required />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input type="number" name="price" value={form.price} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input type="number" name="stock" value={form.stock} onChange={onChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>Tags (comma separated)</label>
                    <input name="tags" value={form.tags} onChange={onChange} />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Add</button>
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>Reset</button>
                </div>
            </form>
        </div>
    );
}
