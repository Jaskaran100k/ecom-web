import { CartItem as CartItemType } from "../types";
import { useCart } from "../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <img
        src={item.images[0]}
        alt={item.name}
        loading="lazy"
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "8px",
          marginRight: "1rem",
        }}
      />
      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontSize: "1rem",
            marginBottom: "0.25rem",
            textAlign: "center",
          }}
        >
          {item.name}
        </h4>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          ${item.price} x {item.quantity} = $
          {(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          type="number"
          value={item.quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateQuantity(item.id, parseInt(e.target.value, 10))
          }
          min="1"
          style={{ width: "50px", padding: "0.5rem" }}
        />
        <button
          onClick={() => removeFromCart(item.id)}
          style={{
            background: "#ff4d4f",
            padding: "0.5rem 1rem",
            color: "#fff",
            border: "none",
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
