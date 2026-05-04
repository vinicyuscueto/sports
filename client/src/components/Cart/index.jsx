import { CartContext } from "../../contexts/Cart/CartContext";
import { useContext } from "react";
import { useProducts } from "../../hooks/useProducts";
import "./style.css";

const Cart = () => {
  const { cart, addCart, removeCart, clearCart } = useContext(CartContext);
  const { data: products = [], isLoading, error } = useProducts();

  const cartItems = cart.map((item) => {
      const product = products.find((p) => String(p.id) === String(item.productId));

      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const purchase = async () => {
    try {
      await clearCart();
      alert("Compra concluída com sucesso.");
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao finalizar compra.");
    }
  };

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="cart">
      <div className="small-container">
        <h2>CARRINHO</h2>

        <div className="cart-list">
          {cartItems.length === 0 && (
            <div className="message">
              <p>Seu carrinho está vazio.</p>
            </div>
          )}

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h4>{item.name}</h4>

                <div className="actions">
                  <p>Quantidade: {item.quantity}</p>
                  <button
                    onClick={() => addCart(item.id, 1)}
                    className="button-plus"
                  >
                    <i className="bx bx-plus" />
                  </button>
                  <button
                    onClick={() => removeCart(item.id)}
                    className="button-minus"
                  >
                    <i className="bx bx-minus" />
                  </button>
                </div>
              </div>

              <div className="cart-item-subtotal">
                <h4>
                  {(item.price * item.quantity).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div className="summary-row">
              <h4>Total: </h4>
              <h4>
                {total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h4>
            </div>

            <div className="summary-actions">
              <button className="button" onClick={purchase}>
                Finalizar Compra
              </button>

              <button className="button-label" onClick={clearCart}>
                Limpar carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
