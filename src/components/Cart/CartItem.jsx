import React from "react";

export default function CartItem({ item, changeQty, removeFromCart }) {
    return (
        <tr>
            <td>
                <img src={item.image} alt={item.name} className="cart-image" />
            </td>
            <td className="cart-item-name">{item.name}</td>
            <td>₹{item.price}</td>
            <td>
                <div className="qty-control">
                    <button className="qty-btn" onClick={() => changeQty(item.id, -1)}> - </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => changeQty(item.id, +1)}>+</button>
                </div>
            </td>
            <td>₹{item.price * item.quantity}</td>
            <td>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                </button>
            </td>
        </tr>
    );
}
