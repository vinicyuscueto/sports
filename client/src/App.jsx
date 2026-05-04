import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth/AuthProvider";
import { CartProvider } from "./contexts/Cart/CartProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Shopping from "./pages/Shopping";
import Access from "./pages/Access";
import PublicRoutes from "./utils/PublicRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route path="/access" element={<Access />} />
              </Route>

              <Route element={<PrivateRoutes />}>
                <Route path="/shopping" element={<Shopping />} />
              </Route>

              <Route path="/product" element={<Product />} />
              <Route path="/products" element={<Products />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
