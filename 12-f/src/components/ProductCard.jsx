import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Asumimos que el backend envia finalPrice o price
  const price = product.finalPrice || product.price;

  return (
    <div className="product-card">
      <Link to={`/producto/${product._id}`} className="product-link">
        <div className="product-image-container">
          {product.image ? (
            <img src={product.image} alt={product.name} className="product-img" />
          ) : (
            <div className="product-image-placeholder">
              <span>{product.name.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-category">
            {product.category?.name || 'General'}
          </p>
          <div className="product-footer">
            <span className="product-price">${price.toFixed(2)}</span>
            <span className={`product-status ${product.quantity > 0 ? 'in-stock' : 'out-stock'}`}>
              {product.quantity > 0 ? `Stock: ${product.quantity}` : 'Agotado'}
            </span>
          </div>
        </div>
      </Link>
      
      <button 
        className="btn-add-cart" 
        onClick={() => addToCart(product, 1)}
        disabled={product.quantity === 0}
      >
        <ShoppingCart size={18} />
        {product.quantity === 0 ? 'Sin Stock' : 'Agregar'}
      </button>
    </div>
  );
};
