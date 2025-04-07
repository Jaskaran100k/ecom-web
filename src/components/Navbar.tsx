import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Sneakers
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          {[
            { to: "/collections", label: "Collections" },
            { to: "/men", label: "Men" },
            { to: "/women", label: "Women" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons & User Actions */}
        <div className="nav-icons">
          {user ? (
            <>
              <Link to="/cart" className="cart-icon">
                <FaShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>
              <button onClick={logout} className="user-icon">
                <FaUser size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">
                Login
              </Link>
              <Link to="/signup" className="auth-link">
                Signup
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="hamburger"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {[
          { to: "/collections", label: "Collections" },
          { to: "/men", label: "Men" },
          { to: "/women", label: "Women" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="backdrop" onClick={() => setIsOpen(false)}></div>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: #1a1a1a;
          color: white;
          padding: 1rem 2rem;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .nav-icons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cart-icon {
          position: relative;
          color: white;
          text-decoration: none;
        }

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -10px;
          background: #ff6f61;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 0.7rem;
        }

        .user-icon, .hamburger {
          background: none;
          border: none;
          cursor: pointer;
          color: white;
        }

        .auth-link {
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .hamburger {
          display: none;
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: -100%;
          width: 75%;
          height: 100%;
          background: #1a1a1a;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: left 0.3s ease-in-out;
        }

        .mobile-menu.open {
          left: 0;
        }

        .mobile-link {
          color: white;
          text-decoration: none;
          font-size: 1rem;
        }

        /* Backdrop */
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 900;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};
