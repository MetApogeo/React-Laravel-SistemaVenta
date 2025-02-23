import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 🔥 Importamos useNavigate
import { toast } from "react-toastify";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, getTotal } = useContext(CartContext);
  const navigate = useNavigate(); // 🔥 Para redirigir a la pantalla de pago

  const handleGoToPayment = () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío.");
      return;
    }
    navigate("/payment"); // 🔥 Redirige a la página de pago
  };

  return (
    <div className="container">
      <h2 className="text-center">
        <FaShoppingCart /> Carrito de Compras
      </h2>
      <ul className="list-group">
        {cart.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name} - ${item.price} x {item.quantity}
            <div>
              <button className="btn btn-outline-primary btn-sm me-2" onClick={() => increaseQuantity(item.id)}>
                <FaPlus />
              </button>
              <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => decreaseQuantity(item.id)}>
                <FaMinus />
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                <FaTrash /> Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="mt-3">Total: ${getTotal()}</h3>
      <button className="btn btn-success btn-lg w-100 mt-3" onClick={handleGoToPayment}>
        <FaShoppingCart /> Finalizar Compra
      </button>
    </div>
  );
}

export default Cart;
