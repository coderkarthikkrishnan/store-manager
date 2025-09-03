import React from "react";
import SaleRecord from "./SaleRecord";
import "./Sales.css";

export default function Sales({ sales }) {
    return (
        <div className="sales-container">
            <h4 className="sales-title">Sales</h4>
            {sales.length === 0 ? (
                <p className="sales-empty">No sales yet.</p>
            ) : (
                <div className="sales-table-wrapper">
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Products</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((s, idx) => (
                                <SaleRecord key={idx} sale={s} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
