import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { CartContext } from "./CartContext";
import api from "../../services/api";

const CartProvider = ({ children }) => {
  const { session } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!session?.id) {
      setCart([]);
      return;
    }

    const loadCart = async () => {
      try {
        const { data } = await api.get(`/cart/${session.id}`);
        setCart(data?.items || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadCart();
  }, [session?.id]);

  const addCart = async (productId, quantity = 1) => {
    if (!session?.id) return;

    try {
      const { data } = await api.post("/cart/add", {
        userId: session.id,
        productId: productId,
        quantity: quantity,
      });

      setCart(data?.items || []);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Por favor, tente novamente mais tarde.",
      };
    }
  };

  const removeCart = async (productId) => {
    if (!session?.id) return;

    try {
      const { data } = await api.post("/cart/remove", {
        userId: session.id,
        productId: productId,
      });

      setCart(data?.items || []);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Por favor, tente novamente mais tarde.",
      };
    }
  };

  const clearCart = async () => {
    if (!session?.id) return;

    try {
      await api.delete(`/cart/${session.id}`);
      setCart([]);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Por favor, tente novamente mais tarde.",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        removeCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
