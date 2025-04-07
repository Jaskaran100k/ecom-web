import { Product } from "../types"; // Import the Product type to define expected prop structure
import { useCart } from "../context/CartContext"; // Import the cart context to access addToCart function
import { useState } from "react"; // Import useState to manage hover state

// Define the props interface for the ProductCard component
interface ProductCardProps {
  product: Product;
}

// Define the ProductCard component
export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart(); // Get addToCart function from cart context
  const [isHovered, setIsHovered] = useState(false); // State to track hover effect

  return (
    <div
      style={{
        background: "#fff", // White background for a clean look
        borderRadius: "12px", // Rounded corners for a modern design
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", // Soft shadow for depth
        padding: "1.5rem", // Padding inside the card
        width: "220px", // Fixed width to ensure uniformity
        transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transitions
        cursor: "pointer", // Indicates the card is interactive
      }}
      // Handle hover effects
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)"; // Slightly lifts the card
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.1)"; // Enhances shadow
        setIsHovered(true); // Set hover state to true
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"; // Resets position
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)"; // Resets shadow
        setIsHovered(false); // Set hover state to false
      }}
    >
      {/* Product Image */}
      <img
        src={product.images[0]}
        alt={product.name}
        loading="lazy" // Lazy loading to optimize performance
        style={{
          width: "100%", // Full width of the container
          height: "150px", // Fixed height
          objectFit: "cover", // Ensures the image fills the space without distortion
          borderRadius: "8px", // Rounded corners
          marginBottom: "1rem", // Space below the image
        }}
      />

      {/* Product Name */}
      <h3
        style={{
          fontSize: "1.25rem", // Slightly larger text for visibility
          marginBottom: "0.5rem", // Adds spacing
          textAlign: "center", // Centers the text
        }}
      >
        {product.name}
      </h3>

      {/* Product Description (Changes on Hover) */}
      <p
        style={{
          fontSize: "0.9rem", // Smaller font for readability
          color: "#666", // Muted text color
          marginBottom: "0.5rem", // Adds spacing
          transition: "all 0.3s ease", // Smooth transition effect
        }}
      >
        {isHovered ? product.description : product.shortDescription}
      </p>

      {/* Product Price */}
      <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#1e90ff" }}>
        ${product.price}
      </p>

      {/* Product Rating */}
      <p style={{ fontSize: "0.9rem", color: "#888" }}>
        Rating: {product.rating}/5
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents unintended hover effect interference
          addToCart(product, 1); // Calls function to add product to the cart with a default quantity of 1
        }}
        style={{ width: "100%", marginTop: "1rem" }} // Full-width button for easy access
      >
        Add to Cart
      </button>
    </div>
  );
};
