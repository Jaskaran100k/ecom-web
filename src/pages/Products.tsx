import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Dell XPS 13 Laptop",
    shortDescription: "High-performance laptop",
    description: "13.4-inch UHD+ display, 16GB RAM, 1TB SSD.",
    price: 1299.99,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1663354027456-ce6a7e07d212?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500",
    ],
    category: "Electronics",
    reviews: [],
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
    ],
    category: "Electronics",
    reviews: [],
  },
  {
    id: 3,
    name: "iPhone 11 ",
    shortDescription: "Latest smartphone",
    description: "6.1-inch Super Retina XDR, 128GB storage.",
    price: 999.99,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500",
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
      "https://images.unsplash.com/photo-1619471327033-3fb3b2b0d966?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnMlMjBsZXZpc3xlbnwwfHwwfHx8MA%3D%3D?w=500",
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
      "https://images.unsplash.com/photo-1567333126229-db29200c25f1?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500",
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
      "https://images.unsplash.com/photo-1579811216948-6f57c19376a5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D?w=500",
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
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500",
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
      "https://images.unsplash.com/photo-1690016424217-03f4d9427a6a?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500",
    ],
    category: "Accessories",
    reviews: [],
  },
];

export const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<"price" | "rating" | "">("");

  const filteredProducts = mockProducts
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => (category ? product.category === category : true))
    .sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#f9f9f9",
      }}
    >
      <h2
        style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#1a1a1a" }}
      >
        Our Products
      </h2>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            maxWidth: "250px",
            padding: "0.75rem",
            fontSize: "0.9rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "0.75rem",
            fontSize: "0.9rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          style={{
            padding: "0.75rem",
            fontSize: "0.9rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <option value="">Sort By</option>
          <option value="price">Price (Low to High)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};
