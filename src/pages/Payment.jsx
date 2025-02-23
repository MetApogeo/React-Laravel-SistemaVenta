import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Payment() {
  const { finalizePurchase, clearCart, cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiration: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  // 🔥 Manejar la selección del método de pago
  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    
    // 🔥 Si cambia a "Efectivo", limpiar campos y errores de la tarjeta
    if (method === "Efectivo") {
      setCardDetails({
        cardNumber: "",
        cardHolder: "",
        expiration: "",
        cvv: "",
      });
      setErrors({});
    }
  };

  // 🔥 Manejar cambios en el formulario de tarjeta
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "expiration") {
      // 🔥 Autoformato MM/YY
      value = value.replace(/\D/g, ""); // Quita caracteres no numéricos
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
    }

    setCardDetails({ ...cardDetails, [name]: value });
  };

  // 🔥 Validar datos de la tarjeta
  const validateCard = () => {
    let newErrors = {};
    if (!/^\d{16}$/.test(cardDetails.cardNumber)) newErrors.cardNumber = "Número de tarjeta inválido (16 dígitos)";
    if (!cardDetails.cardHolder.trim()) newErrors.cardHolder = "El nombre del titular es obligatorio";
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiration)) newErrors.expiration = "Formato inválido (MM/YY)";
    if (!/^\d{3}$/.test(cardDetails.cvv)) newErrors.cvv = "CVV inválido (3 dígitos)";
    return newErrors;
  };

  // 🔥 Procesar pago
  const handlePayment = () => {
    if (paymentMethod === "Tarjeta de Crédito") {
      const validationErrors = validateCard();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast.error("Error en los datos de la tarjeta.");
        return;
      }
    }

    // 🔥 Simulación de procesamiento
    setTimeout(() => {
      finalizePurchase(paymentMethod, cart);
      clearCart();
      toast.success(`✅ Compra realizada con ${paymentMethod}`, { position: "top-right", autoClose: 2000 });
      navigate("/history"); // 🔥 Redirige al historial de compras
    }, 1500);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Selecciona un Método de Pago</h2>
      <div className="d-flex justify-content-center gap-3">
        <button
          className={`btn ${paymentMethod === "Tarjeta de Crédito" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => handlePaymentSelection("Tarjeta de Crédito")}
        >
          💳 Pagar con Tarjeta
        </button>
        <button
          className={`btn ${paymentMethod === "Efectivo" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => handlePaymentSelection("Efectivo")}
        >
          💵 Pagar en Efectivo
        </button>
      </div>

      {paymentMethod === "Tarjeta de Crédito" && (
        <div className="mt-4 p-3 border rounded">
          <h4 className="text-center">Detalles de la Tarjeta</h4>
          <div className="mb-3">
            <label className="form-label">Número de Tarjeta</label>
            <input
              type="text"
              name="cardNumber"
              className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
              value={cardDetails.cardNumber}
              onChange={handleChange}
              placeholder="1234567890123456"
              maxLength="16"
            />
            {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Titular de la Tarjeta</label>
            <input
              type="text"
              name="cardHolder"
              className={`form-control ${errors.cardHolder ? "is-invalid" : ""}`}
              value={cardDetails.cardHolder}
              onChange={handleChange}
              placeholder="Nombre Completo"
            />
            {errors.cardHolder && <div className="invalid-feedback">{errors.cardHolder}</div>}
          </div>

          <div className="d-flex gap-3">
            <div className="mb-3 w-50">
              <label className="form-label">Fecha de Expiración</label>
              <input
                type="text"
                name="expiration"
                className={`form-control ${errors.expiration ? "is-invalid" : ""}`}
                value={cardDetails.expiration}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiration && <div className="invalid-feedback">{errors.expiration}</div>}
            </div>

            <div className="mb-3 w-50">
              <label className="form-label">CVV</label>
              <input
                type="text"
                name="cvv"
                className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                value={cardDetails.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="3"
              />
              {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
            </div>
          </div>

          <button className="btn btn-success w-100" onClick={handlePayment}>
            ✅ Confirmar Pago
          </button>
        </div>
      )}
      
      {/* Botón de pagar en efectivo */}
      {paymentMethod === "Efectivo" && (
        <div className="mt-4 text-center">
          <button className="btn btn-success w-50" onClick={handlePayment}>
            ✅ Confirmar Pago en Efectivo
          </button>
        </div>
      )}
    </div>
  );
}

export default Payment;
