export const Footer = () => {
  return (
    <footer
      style={{
        background: "#1a1a1a",
        color: "#fff",
        padding: "2rem",
        textAlign: "center",
        fontSize: "0.9rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "1rem",
          }}
        >
          <a href="/about" style={{ color: "#fff", textDecoration: "none" }}>
            About Us
          </a>
          <a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>
            Contact
          </a>
          <a href="/privacy" style={{ color: "#fff", textDecoration: "none" }}>
            Privacy Policy
          </a>
          <a href="/terms" style={{ color: "#fff", textDecoration: "none" }}>
            Terms of Service
          </a>
          <a href="/shipping" style={{ color: "#fff", textDecoration: "none" }}>
            Shipping
          </a>
        </div>
        <p>© 2025 Sneakers. All rights reserved.</p>
      </div>
    </footer>
  );
};
