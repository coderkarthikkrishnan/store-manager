// CustomToast.js
import React from "react";
import "./CustomToast.css";

export default function CustomToast({ message }) {
    return (
        <div className="custom-toast">
            <span className="toast-icon">🛒</span>
            <span className="toast-message">{message}</span>
        </div>
    );
}
