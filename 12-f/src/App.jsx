import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthProvider.jsx' // IMPORT
import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import AdminUsers from './pages/AdminUsers.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
          {/* Rutas Estáticas Principales */}
          <Route index element={<Home />} />
          <Route path="productos" element={<Products />} />
          
          {/* Rutas Dinámicas */}
          <Route path="producto/:id" element={<ProductDetail />} />
          
          {/* Checkout / Auth */}
          <Route path="carrito" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />

            {/* Panel de administracion del admin */}
            <Route path="admin/usuarios" element={
              
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                {/* Crear adminUsers y completar protectedRoute */}
                <AdminUsers />
              </ProtectedRoute>
            } >
              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
