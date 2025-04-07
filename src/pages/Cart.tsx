import { useCart } from "../context/CartContext";
import { CartItem as CartItemType } from "../types";

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } =
    useCart();

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#f9f9f9",
        color: "#1a1a1a",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Your Cart</h2>
      {cart.length === 0 ? (
        <p style={{ fontSize: "1rem", color: "#666" }}>Your cart is empty.</p>
      ) : (
        <>
          <button
            onClick={clearCart}
            style={{
              background: "#ff6f61",
              color: "#fff",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
          {cart.map((item: CartItemType) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                borderRadius: "12px",
                padding: "1rem",
                marginBottom: "1rem",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                loading="lazy"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "1rem",
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  {item.name}
                </h4>
                <p style={{ fontSize: "1rem", color: "#666" }}>
                  ${item.price.toFixed(2)} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  min="1"
                  style={{
                    width: "60px",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "#ff6f61",
                    padding: "0.5rem 1rem",
                    fontSize: "0.9rem",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "2rem", textAlign: "right" }}>
            <h3 style={{ fontSize: "1.5rem", color: "#1a1a1a" }}>
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <button
              style={{
                background: "#2ecc71",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                marginTop: "1rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
