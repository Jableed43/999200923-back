import { createContext, useContext, useState, useEffect } from 'react';

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Hook personalizado para usar el contexto fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// 3. Proveedor del Estado Global
export const CartProvider = ({ children }) => {
  // Inicializamos leyendo de sessionStorage si existe, o un array vacío
  const [cartItems, setCartItems] = useState(() => {
    try {
      const item = window.sessionStorage.getItem('ecommerce_cart');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error leyendo carrito del sessionStorage', error);
      return [];
    }
  });

  // Guardar en sessionStorage cada vez que cartItems cambia (Persistencia)
  useEffect(() => {
    window.sessionStorage.setItem('ecommerce_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Acción: Agregar al carrito
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Verificamos si el producto ya está en el carrito (usamos _id o id)
      const productId = product._id || product.id;
      const existingItem = prevItems.find(item => (item.product._id || item.product.id) === productId);

      if (existingItem) {
        // Si existe, le sumamos la cantidad extra
        return prevItems.map(item => 
          (item.product._id || item.product.id) === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Si es nuevo, lo agregamos al array
      return [...prevItems, { product, quantity }];
    });
  };

  // Acción: Remover producto completo del carrito
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => (item.product._id || item.product.id) !== productId));
  };

  // Acción: Actualizar cantidad específica de un producto (+ o -)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // No permitimos cantidades menores a 1

    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.product._id || item.product.id) === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // Acción: Vaciar carrito entero (Checkout exitoso)
  const clearCart = () => {
    setCartItems([]);
    window.sessionStorage.removeItem('ecommerce_cart');
  };

  // Helpers para la UI (Monto total y Cantidad de ítems)
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.finalPrice || item.product.price || 0) * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
