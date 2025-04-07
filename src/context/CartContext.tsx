import { createContext, useState, useContext } from "react";
import { Product, CartItem } from "../types";
import { toast } from "react-toastify";

// Define the shape of the cart context
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void; // New method to clear the cart
  totalPrice: number;
  totalItems: number; // New property for total number of items
}

// Create the context with an undefined initial value
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Cart provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add a product to the cart with a specified quantity
  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      toast.error("Quantity must be greater than 0", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // If the product exists, update its quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If the product doesn't exist, add it with the specified quantity
        return [...prevCart, { ...product, quantity }];
      }
    });

    // Show a toast notification
    toast.success(
      `${quantity} ${product.name}${quantity > 1 ? "s" : ""} added to cart!`,
      {
        position: "top-right",
        autoClose: 2000,
        style: { background: "#4caf50", color: "#fff" },
      }
    );
  };

  // Remove a product from the cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.info("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
