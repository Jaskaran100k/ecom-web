import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Product, Review } from "../types";
import Slider from "react-slick";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Dell XPS 13 Laptop",
    shortDescription: "High-performance laptop",
    description: "13.4-inch UHD+ display, 16GB RAM, 1TB SSD.",
    price: 1299.99,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsbCUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D?w=500",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsbCUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D?w=500",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsbCUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D?w=500",
    ],
    category: "Electronics",
    reviews: [
      { id: 1, rating: 5, comment: "Great laptop!", user: "John Doe" },
      {
        id: 2,
        rating: 4,
        comment: "Good value for money.",
        user: "Jane Smith",
      },
    ],
  },
  {
    id: 2,
    name: "Sony WH-1000XM4 Headphones",
    shortDescription: "Noise-cancelling headphones",
    description: "Premium headphones with 30-hour battery life.",
    price: 349.99,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    ],
    category: "Electronics",
    reviews: [],
  },
  {
    id: 3,
    name: "iPhone 14 Pro",
    shortDescription: "Latest smartphone",
    description: "6.1-inch Super Retina XDR, 128GB storage.",
    price: 999.99,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    ],
    category: "Electronics",
    reviews: [],
  },
  {
    id: 4,
    name: "Nike Air Max 270",
    shortDescription: "Men's running shoes",
    description: "Comfortable shoes with air cushioning.",
    price: 120.0,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
    ],
    category: "Clothing",
    reviews: [],
  },
  {
    id: 5,
    name: "Adidas Ultraboost",
    shortDescription: "Women's running shoes",
    description: "Boost technology for energy return.",
    price: 180.0,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
    ],
    category: "Clothing",
    reviews: [],
  },
  {
    id: 6,
    name: "Levi's 501 Jeans",
    shortDescription: "Classic men's jeans",
    description: "Durable denim with a classic fit.",
    price: 69.99,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1566530272790-723f919e7e5b?w=500",
    ],
    category: "Clothing",
    reviews: [],
  },
  {
    id: 7,
    name: "Ray-Ban Sunglasses",
    shortDescription: "Polarized sunglasses",
    description: "Stylish sunglasses with UV protection.",
    price: 159.99,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1578705761152-a228a4c8d1b2?w=500",
    ],
    category: "Accessories",
    reviews: [],
  },
  {
    id: 8,
    name: "Apple Watch Series 8",
    shortDescription: "Smartwatch",
    description: "Health tracking with 41mm case.",
    price: 399.99,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500",
    ],
    category: "Electronics",
    reviews: [],
  },
  {
    id: 9,
    name: "Puma RS-X",
    shortDescription: "Men's sneakers",
    description: "Bold design with cushioned sole.",
    price: 90.0,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce9e0c1a5?w=500",
    ],
    category: "Clothing",
    reviews: [],
  },
  {
    id: 10,
    name: "Fitbit Charge 5",
    shortDescription: "Fitness tracker",
    description: "Advanced health and fitness tracking.",
    price: 179.99,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990d71bee1e3?w=500",
    ],
    category: "Accessories",
    reviews: [],
  },
];

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = mockProducts.find((p) => p.id === parseInt(id || "0"));
  if (!product)
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#1a1a1a" }}>
        Product not found
      </div>
    );

  const relatedProducts = mockProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, relatedProducts.length),
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#fff",
        color: "#1a1a1a",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Image Section */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            style={{
              width: "100%",
              borderRadius: "12px",
              maxHeight: "400px",
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index}`}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  width: "70px",
                  height: "70px",
                  cursor: "pointer",
                  borderRadius: "8px",
                  border:
                    currentImageIndex === index
                      ? "2px solid #ff6f61"
                      : "1px solid #ddd",
                  objectFit: "cover",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        {/* Details Section */}
        <div style={{ flex: 2, minWidth: "300px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "1rem",
              color: "#1a1a1a",
            }}
          >
            {product.name}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                color: "#ff6f61",
                fontWeight: "bold",
              }}
            >
              ${product.price.toFixed(2)}
            </p>
            <span
              style={{
                fontSize: "0.9rem",
                color: "#666",
                background: "#e6f3ff",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
              }}
            >
              {product.rating} ★
            </span>
          </div>
          <p
            style={{
              fontSize: "1rem",
              color: "#666",
              marginBottom: "1.5rem",
              lineHeight: "1.6",
            }}
          >
            {product.description}
          </p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f9f9f9",
                padding: "0.75rem",
                borderRadius: "8px",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1rem",
                  color: "#ff6f61",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                -
              </button>
              <span
                style={{
                  fontSize: "0.9rem",
                  width: "30px",
                  textAlign: "center",
                  color: "#1a1a1a",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1rem",
                  color: "#ff6f61",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(product, quantity)}
              style={{
                flex: 0.5,
                padding: "0.5rem",
                background: "#ff6f61",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
            <button
              style={{
                flex: 0.5,
                padding: "0.5rem",
                background: "#2ecc71",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <div
        style={{
          marginTop: "2rem",
          background: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "12px",
        }}
      >
        <h2
          style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#1a1a1a" }}
        >
          Customer Reviews
        </h2>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div
              key={review.id}
              style={{
                marginBottom: "1rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid #ddd",
              }}
            >
              <p style={{ fontSize: "1rem", color: "#1a1a1a" }}>
                <strong>{review.user}</strong> - {review.rating}/5
              </p>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "0.9rem", color: "#666" }}>No reviews yet.</p>
        )}
      </div>
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
              color: "#1a1a1a",
            }}
          >
            Related Products
          </h2>
          <Slider {...settings}>
            {relatedProducts.map((related) => (
              <div key={related.id} style={{ padding: "0 0.5rem" }}>
                <Link to={`/products/${related.id}`}>
                  <img
                    src={related.images[0]}
                    alt={related.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1rem",
                      marginTop: "0.5rem",
                      color: "#1a1a1a",
                    }}
                  >
                    {related.name}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#ff6f61" }}>
                    ${related.price.toFixed(2)}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};
