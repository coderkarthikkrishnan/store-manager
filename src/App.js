import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Inventory from "./components/Inventory/Inventory";
import Cart from "./components/Cart/Cart";
import Sales from "./components/Sales/Sales";
import AddProduct from "./components/Sales/AddProduct";
import ProductCatalog from "./components/Product/ProductCatalog";
import Footer from "./components/Footer"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Tissue box",
    image:
      "https://homeessentials.in/cdn/shop/files/m-3_ce4e7d63-bdfc-4bc2-84e1-38c2f59d325f_1220x1220_crop_center.jpg?v=1750145684",
    price: 500,
    stock: 10,
    tags: ["Tissue", "accessory"],
  },
  {
    id: 2,
    name: "Milk Biscuit",
    image:
      "https://cdn.shopaccino.com/edible-smart/products/britannia-milk-bikis-biscuits-102937_l.jpg?v=582",
    price: 10,
    stock: 30,
    tags: ["food", "biscuit", "snack"],
  },
  {
    id: 3,
    name: "Notebook A4",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3bQ-oFN4R_LcBGLOv2d-UA5f9rIWXcNpXA&s",
    price: 149,
    stock: 25,
    tags: ["stationery"],
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    image:
      "https://www.theaudiostore.in/cdn/shop/files/sony-ult-field-1-wireless-portable-speaker-black-43933713563903.png?v=1744393287",
    price: 1299,
    stock: 15,
    tags: ["electronics", "audio", "music"],
  },
  {
    id: 5,
    name: "Instant Coffee",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgO_p7dnkfC_CiceKPa-t2zAjN3a-k8RWSpQ&s",
    price: 299,
    stock: 40,
    tags: ["beverage", "coffee", "food"],
  },
  {
    id: 6,
    name: "Ballpoint Pen Set",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHd-n4nVB7uIRTLxvgyhwsKjenuBuUxpEbQ&s",
    price: 99,
    stock: 50,
    tags: ["stationery", "writing"],
  },
  {
    id: 7,
    name: "LED Desk Lamp",
    image:
      "https://images.meesho.com/images/products/301158162/omevf_512.webp?width=512",
    price: 799,
    stock: 20,
    tags: ["electronics", "lighting", "home"],
  },
  {
    id: 8,
    name: "Pack of Green Tea",
    image: "https://m.media-amazon.com/images/I/51hakthbY5L.jpg",
    price: 199,
    stock: 35,
    tags: ["beverage", "tea", "food"],
  },
  {
    id: 9,
    name: "Portable Water Bottle",
    image:
      "https://homeessentials.in/cdn/shop/files/6_4efba28d-b5fd-4789-9b51-b88b0ad77a8b.webp?v=1749583481",
    price: 250,
    stock: 45,
    tags: ["accessory", "travel", "home"],
  },
  {
    id: 10,
    name: "Yoga Mat",
    image:
      "https://sppartos.com/cdn/shop/files/31VX-aIlgWL.jpg?v=1702469142",
    price: 599,
    stock: 12,
    tags: ["fitness", "exercise", "health"],
  },
  {
    id: 11,
    name: "Ceramic Mug",
    image:
      "https://nurtureindia.in/cdn/shop/files/Floral_Extravaganza_Cups.jpg?v=1751354334",
    price: 349,
    stock: 22,
    tags: ["home", "kitchen", "drinkware"],
  },
  {
    id: 12,
    name: "Desk Organizer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQASeRTHCRsJhDUAvoKbo22pCRZ66dzGg950g&s",
    price: 459,
    stock: 18,
    tags: ["home", "office", "stationery"],
  },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);

  // derived
  const cartCount = useMemo(
    () => cart.reduce((n, i) => n + i.quantity, 0),
    [cart]
  );

  // cart ops
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        if (existing.quantity + 1 > product.stock) return prev; // prevent exceeding stock
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );

      }
      return [{ ...product, quantity: 1 }, ...prev];
    });

    toast.success(`${product.name} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, quantity: Math.max(1, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    const removed = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((i) => i.id !== id));

    // ✅ Toast when product is removed
    if (removed) {
      toast.error(`${removed.name} removed from cart ❌`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared 🧹", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  // checkout
  const checkout = () => {
    if (cart.length === 0) return;

    const outOfStock = cart.find((c) => {
      const p = products.find((x) => x.id === c.id);
      return !p || c.quantity > p.stock;
    });
    if (outOfStock) {
      toast.error(
        "Some items exceed available stock. Adjust quantities and try again.",
        { position: "top-center", autoClose: 3000 }
      );
      return;
    }

    const total = cart.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    const date = new Date().toLocaleString();

    setSales((prev) => [{ date, items: cart, total }, ...prev]);

    setProducts((prev) =>
      prev.map((p) => {
        const ci = cart.find((c) => c.id === p.id);
        return ci ? { ...p, stock: p.stock - ci.quantity } : p;
      })
    );

    setCart([]);
    toast.success("Checkout successful ✅", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
  };

  // update stock
  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: newStock } : p
      )
    );
    toast.success("Stock updated🎉", {
      position: "top-left",
      autoClose: 2000,
    });
  };

  const addProduct = (payload) => {
    const id = Date.now();
    setProducts((prev) => [{ id, ...payload }, ...prev]);
    toast.success("New product added 🎉", {
      position: "top-left",
      autoClose: 2000,
    });
  };

  const removeProduct = (id) => {
    const removed = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (removed) {
      toast.error(`${removed.name} deleted 🗑️`, {
        position: "top-left",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <NavBar cartCount={cartCount} />
      <div className="container my-4">
        <Routes>
          <Route
            path="/"
            element={
              <Inventory
                products={products}
                updateStock={updateStock}
                removeProduct={removeProduct}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeQty={changeQty}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                checkout={checkout}
              />
            }
          />
          <Route path="/sales" element={<Sales sales={sales} />} />
          <Route
            path="/add-product"
            element={<AddProduct addProduct={addProduct} />}
          />
          <Route
            path="/catalog"
            element={
              <ProductCatalog
                products={products}
                addToCart={addToCart}
              />
            }
          />
        </Routes>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
