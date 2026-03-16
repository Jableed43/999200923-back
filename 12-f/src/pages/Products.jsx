import { useState, useEffect } from 'react';
import { useGetProducts } from '../hooks/useGetProducts';
import { useGetCategories } from '../hooks/useGetCategories';
import { ProductCard } from '../components/ProductCard';
import { Search } from 'lucide-react';

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Extraemos refetch para hacer la busqueda manual
  const { products, loading, error, refetch } = useGetProducts();
  const { categories } = useGetCategories();

  // Escuchamos el boton de busqueda o la select box
  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedCategory) params.category = selectedCategory;
    refetch(params);
  };

  useEffect(() => {
    // Si cambia de categoria reseteamos la busqueda automaticamente
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedCategory) params.category = selectedCategory;
    refetch(params);
    // eslint-disable-next-line
  }, [selectedCategory]);

  return (
    <div className="products-page">
      <div className="catalog-header">
        <h2>Catálogo de Productos</h2>
        
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Buscar (ej. laptop, teclado...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <button type="submit" className="search-btn">Buscar</button>
        </form>
      </div>

      <div className="catalog-content">
        {loading && <p className="loading-text">Buscando en el inventario...</p>}
        {error && <p className="error-text">Error conectando con el servidor: {error}</p>}
        
        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <p>No se encontraron productos para tu búsqueda.</p>
          </div>
        )}

        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
