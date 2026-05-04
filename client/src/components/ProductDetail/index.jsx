import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { CartContext } from "../../contexts/Cart/CartContext";
import { useProducts } from "../../hooks/useProducts";
import "./style.css";

const ProductDetail = () => {
  const { data: products, isLoading, error } = useProducts();
  const { session } = useContext(AuthContext);
  const { addCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const productId = new URLSearchParams(location.search).get("id");
  const product = products?.find((p) => String(p.id) === String(productId));

  const handlePurchase = async (e) => {
    e.preventDefault();

    if (!session) {
      navigate("/access");
      return;
    }

    if (quantity < 1) {
      alert("Selecione pelo menos um item.");
      return;
    }

    try {
      await addCart(productId, quantity);

      alert("Produto adicionado ao carrinho.");
      navigate("/shopping");
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao adicionar ao carrinho.");
    }
  };

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="product-detail">
      <div className="small-container">
        <div className="row">
          <div className="col">
            <img src={product.image} width="100%" />
          </div>

          <div className="col">
            <h1>{product.name}</h1>
            <span>
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <div className="actions">
              <p>Quantidade: {quantity}</p>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="button-plus"
              >
                <i className="bx bx-plus" />
              </button>
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="button-minus"
              >
                <i className="bx bx-minus" />
              </button>
            </div>

            <button className="button" onClick={handlePurchase}>
              Adicionar ao Carrinho
            </button>

            <h4>Descrição:</h4>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
