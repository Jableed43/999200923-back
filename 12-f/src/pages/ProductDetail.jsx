import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductById } from '../hooks/useGetProductById';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, CheckCircle } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, error } = useGetProductById(id);
  const { addToCart } = useCart();
  
  const [quantityToBuy, setQuantityToBuy] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) return <div className="loading-container">Cargando detalles...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;
  if (!product) return <div className="error-container">Producto no encontrado</div>;

  const price = product.finalPrice || product.price;

  const handleAddToCart = () => {
    addToCart(product, quantityToBuy);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // feedback visual de 2 secs
  };

  return (
    <div className="product-detail-page">
      <Link to="/productos" className="back-link">
        <ArrowLeft size={16} /> Volver al catálogo
      </Link>

      <div className="detail-card">
        <div className="detail-image">
          <span>{product.name.charAt(0).toUpperCase()}</span>
        </div>
        
        <div className="detail-info">
          <h2>{product.name}</h2>
          <span className="detail-category">{product.category?.name || 'General'}</span>
          
          <p className="detail-description">
            {product.description || 'Este producto no tiene una descripción detallada provista por el fabricante.'}
          </p>
          
          <div className="detail-price-box">
            <span className="huge-price">${price.toFixed(2)}</span>
            <span className={`stock-badge ${product.quantity > 0 ? '' : 'out'}`}>
              {product.quantity > 0 ? `${product.quantity} unidades disponibles` : 'Agotado'}
            </span>
          </div>

          <div className="detail-actions">
            <div className="quantity-selector">
              <label>Cantidad:</label>
              <input 
                type="number" 
                min="1" 
                max={product.quantity} 
                value={quantityToBuy}
                onChange={(e) => {
                  let val = parseInt(e.target.value);
                  if (val > product.quantity) val = product.quantity;
                  if (val < 1) val = 1;
                  setQuantityToBuy(val);
                }}
                disabled={product.quantity === 0}
              />
            </div>
            
            <button 
              className={`main-add-btn ${added ? 'success' : ''}`}
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
            >
              {added ? (
                <><CheckCircle size={20} /> Agregado!</>
              ) : (
                <><ShoppingCart size={20} /> Agregar al Carrito</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
