import Slider from "react-slick";
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500",
  },
  {
    id: 2,
    name: "Headphones",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1481207801830-97f0f9a1337e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Smartphone",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1726839662758-e3b5da59b0fb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#f9f9f9",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          textAlign: "center",
          color: "#1a1a1a",
        }}
      >
        Welcome to Sneak buy
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "#666",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Discover the best in electronics, clothing, and accessories.
      </p>
      <Slider {...settings}>
        {featuredProducts.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <h3
                style={{
                  fontSize: "1.2rem",
                  textAlign: "center",
                  marginTop: "0.5rem",
                  color: "#1a1a1a",
                }}
              >
                {product.name} - ${product.price}
              </h3>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};
