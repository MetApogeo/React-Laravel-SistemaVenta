import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

function Products() {
  const { addToCart, message } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Estado para el buscador
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
    setFilteredProducts(storedProducts); // Inicialmente mostramos todos los productos
  }, []);

  // 🔍 Función para buscar productos en tiempo real
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setNewProduct({ ...newProduct, image: imageUrl });
      }
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Todos los campos son obligatorios");
      return;
    }

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(product =>
        product.id === editingProduct.id ? { ...editingProduct, ...newProduct, price: Number(newProduct.price) } : product
      );
      setEditingProduct(null);
    } else {
      const newItem = { id: products.length + 1, ...newProduct, price: Number(newProduct.price) };
      updatedProducts = [...products, newItem];
    }

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setNewProduct({ name: "", price: "", image: null });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price, image: product.image });
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="container">
      <h2 className="text-center">Gestión de Productos</h2>

      {message && <div className="alert alert-success text-center">{message}</div>}

      {/* 🔍 Buscador de productos */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🔥 Formulario para agregar/editar un producto */}
      <div className="mb-3">
        <input type="text" name="name" className="form-control" placeholder="Nombre del Producto" value={newProduct.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="number" name="price" className="form-control" placeholder="Precio" value={newProduct.price} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="file" name="image" className="form-control" accept="image/*" onChange={handleChange} />
      </div>

      {newProduct.image && (
        <div className="mb-3">
          <img src={newProduct.image} alt="Vista previa" className="img-thumbnail" width="150" />
        </div>
      )}

      <button className={`btn ${editingProduct ? "btn-warning" : "btn-primary"} mb-3`} onClick={handleAddProduct}>
        {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
      </button>

      {/* 🔥 Lista de productos con buscador */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card h-100 d-flex flex-column">
                {product.image && <img src={product.image} className="card-img-top" alt={product.name} style={{ height: "200px", objectFit: "cover" }} />}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-success fw-bold">${product.price.toFixed(2)}</p>
                  
                  {/* ✅ Contenedor de botones alineados */}
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-warning btn-sm w-50 me-1" onClick={() => handleEditProduct(product)}>✏️ Editar</button>
                      <button className="btn btn-danger btn-sm w-50" onClick={() => handleDeleteProduct(product.id)}>🗑 Eliminar</button>
                    </div>
                    <button className="btn btn-success btn-sm w-100 mt-2" onClick={() => addToCart(product)}>🛒 Agregar al Carrito</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">❌ No hay productos con ese nombre.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
