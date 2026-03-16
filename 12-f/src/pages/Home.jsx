import { Link } from 'react-router-dom';
import { useGetProducts } from '../hooks/useGetProducts';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  // Solo pedimos los productos destacados (highlighted: true)
  const { products, loading, error } = useGetProducts({ highlighted: true });

  return (
    <div className="home-page">
      <section className="hero-banner">
        <h2>Bienvenido a TechCommerce</h2>
        <p>Encuentra los mejores productos al mejor precio.</p>
        <Link to="/productos" className="hero-btn">Ver Catálogo Completo</Link>
      </section>

      <section className="highlighted-section">
        <h3>Productos Destacados</h3>
        
        {loading && <p className="loading-text">Cargando ofertas estelares...</p>}
        {error && <p className="error-text">Oops: {error}</p>}
        
        {!loading && !error && products.length === 0 && (
          <p>No hay productos destacados en este momento.</p>
        )}

        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
