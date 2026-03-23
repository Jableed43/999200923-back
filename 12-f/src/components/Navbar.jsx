import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogIn, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export const Navbar = () => {
  const { getCartCount } = useCart();
  const { isAuthenticated, logout, user, isAdmin, isSeller } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <h1>E-Commerce</h1>
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Catálogo</Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/admin/usuarios">Usuarios</Link>
          </li>
        )}
        {(isAdmin || isSeller) && (
          <li>
            <Link to="/admin/productos">Productos</Link>
          </li>
        )}
        {(isAdmin || isSeller) && (
          <li>
            <Link to="/admin/categorias">Categorias</Link>
          </li>
        )}
        {(isAdmin || isSeller) && (
          <li>
            <Link to="/admin/ventas">Ventas</Link>
          </li>
        )}
      </ul>

      <div className="nav-actions">
        {isAdmin && (
          <Link
            to="/admin/usuarios"
            className="action-icon admin-icon"
            title="Panel Admin"
          ></Link>
        )}

        {isAuthenticated ? (
          <div className="user-nav-info">
            <span className="user-email-nav">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="action-icon logout-btn"
              title="Cerrar Sesión"
            >
              <LogOut size={24} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="action-icon" title="Iniciar Sesión">
            <LogIn size={24} />
          </Link>
        )}

        <Link
          to="/carrito"
          className="action-icon cart-icon-wrapper"
          title="Ir al Carrito"
        >
          <ShoppingCart size={24} />
          {getCartCount() > 0 && (
            <span className="cart-badge">{getCartCount()}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};
