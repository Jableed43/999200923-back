import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx"; // IMPORT
import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminCategories from "./pages/AdminCategories.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { UserPurchases } from "./pages/UserPurchases.jsx";
import { AdminPurchases } from "./pages/AdminPurchases.jsx";
import { AdminProducts } from "./pages/AdminProducts.jsx";

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

              {/* Panel de administracion del admin - Usuarios */}
              <Route
                path="admin/usuarios"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN"]}>
                    {/* Crear adminUsers y completar protectedRoute */}
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />

              {/* Panel de administracion del admin - Productos */}
              <Route
                path="admin/productos"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN"]}>
                    {/* Crear adminUsers y completar protectedRoute */}
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />

              {/* Panel de administracion del admin - Categorias */}
              <Route
                path="admin/categorias"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "SELLER"]}>
                    <AdminCategories />
                  </ProtectedRoute>
                }
              />

              {/* Panel de administracion del admin - Ventas */}
              <Route
                path="admin/ventas"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "SELLER"]}>
                    <AdminPurchases />
                  </ProtectedRoute>
                }
              />

              {/* Rutas de usuario */}
              <Route
                path="perfil"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "SELLER", "CUSTOMER"]}>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              {/* Rutas de usuario */}
              <Route
                path="mis-compras"
                element={
                  <ProtectedRoute allowedRoles={["ADMIN", "SELLER", "CUSTOMER"]}>
                    <UserPurchases />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
