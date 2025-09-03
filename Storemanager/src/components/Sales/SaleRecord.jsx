import React from "react";
import "./SaleRecord.css"; // Add styles

export default function SaleRecord({ sale }) {
    return (
        <tr className="sale-record-row">
            <td className="sale-date">{sale.date}</td>
            <td className="sale-items">
                {(sale.items || [])
                    .map((i) => `${i.name} (x${i.quantity})`)
                    .join(", ")}
            </td>
            <td className="sale-total">₹{sale.total}</td>
        </tr>
    );
}
