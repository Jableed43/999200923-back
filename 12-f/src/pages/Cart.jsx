import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCreatePurchase } from '../hooks/useCreatePurchase';
import { Trash2, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { checkout, loading, error } = useCreatePurchase();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  const handleCheckout = async () => {
    // 1. Verificar si hay token en localStorage para saber si estam logueados
    const token = window.localStorage.getItem('ecommerce_token');
    
    if (!token) {
      // Redirigir al inicio de sesion si no esta logueado
      navigate('/login?redirect=cart');
      return;
    }

    setCheckoutError('');
    setSuccessMsg('');

    // 2. Disparamos la peticion al Backend de Express
    const result = await checkout(cartItems);

    if (result.success) {
      clearCart();
      setSuccessMsg(`¡Compra realizada con éxito! Tu número de orden es: ${result.order?.id || 'Generado'}`);
    } else {
      setCheckoutError(result.error || 'Ocurrió un error al procesar tu compra');
    }
  };

  if (successMsg) {
    return (
      <div className="cart-page center-message">
        <div className="success-box">
          <h2>¡Gracias por tu compra!</h2>
          <p>{successMsg}</p>
          <Link to="/productos" className="btn-continue">Seguir Comprando</Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <ShoppingBag size={64} className="empty-icon" />
        <h2>Tu carrito está vacío</h2>
        <p>Parece que aún no has agregado ningún producto a tu carrito.</p>
        <Link to="/productos" className="btn-continue">Ver Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Tu Carrito de Compras</h2>
      
      {checkoutError && <div className="error-banner">{checkoutError}</div>}
      {error && <div className="error-banner">{error}</div>}

      <div className="cart-container">
        <div className="cart-items-list">
          {cartItems.map((item) => {
            const product = item.product;
            const price = product.finalPrice || product.price;
            
            return (
              <div key={product._id} className="cart-item">
                <div className="cart-item-image">
                  <span>{product.name.charAt(0)}</span>
                </div>
                
                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p className="cart-item-price">${price.toFixed(2)}</p>
                </div>
                
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(product._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(product._id, item.quantity + 1)}
                      disabled={item.quantity >= product.quantity}
                    >+</button>
                  </div>
                  
                  <div className="item-subtotal">
                    ${(price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="btn-remove" 
                    onClick={() => removeFromCart(product._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h3>Resumen de la Orden</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          
          <button 
            className="btn-checkout" 
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Procesando Pago...' : 'Completar Compra'}
          </button>
        </div>
      </div>
    </div>
  );
};
