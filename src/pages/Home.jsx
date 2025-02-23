import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Estado para el buscador
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // 🔍 Filtrar productos en tiempo real
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="text-center">🛍️ Catálogo de Productos</h2>

      {/* 🔍 Buscador */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card h-100 d-flex flex-column">
                {product.image && <img src={product.image} className="card-img-top" alt={product.name} />}
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-success fw-bold">${product.price.toFixed(2)}</p>
                  <button className="btn btn-primary w-100" onClick={() => addToCart(product)}>🛒 Agregar al carrito</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">🔍 No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
