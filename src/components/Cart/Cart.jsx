import React, { useMemo } from "react";
import CartItem from "./CartItem";
import "./Cart.css";

export default function Cart({ cart = [], changeQty, removeFromCart, clearCart, checkout }) {
    const total = useMemo(
        () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cart]
    );
    const totalItems = useMemo(
        () => cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    );

    return (
        <div className="cart-container">
            <h2>Cart ({totalItems} items)</h2>
            {cart.length === 0 ? (
                <div className="cart-empty">No items in cart</div>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    changeQty={changeQty}
                                    removeFromCart={removeFromCart}
                                />
                            ))}
                        </tbody>
                    </table>

                    <div className="cart-footer">
                        <button className="clear-cart" onClick={clearCart}>
                            Clear Cart
                        </button>
                        <div className="total-section">
                            <strong>Total: ₹{total}</strong>
                            <button className="checkout-btn" onClick={checkout}>
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
