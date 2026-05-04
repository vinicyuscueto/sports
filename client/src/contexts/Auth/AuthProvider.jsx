import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../../services/api";

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/me");

        setSession(data);
      } catch (err) {
        localStorage.removeItem("token");
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const signin = async (email, password) => {
    try {
      const { data } = await api.post("/signin", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setSession(data.user);

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

  const signup = async (email, password) => {
    try {
      await api.post("/signup", { email, password });
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

  const signout = () => {
    localStorage.removeItem("token");
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signed: !!session,
        signin,
        signup,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
