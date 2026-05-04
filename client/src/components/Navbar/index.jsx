import image from "../../assets/img/image.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Navbar = ({ isHome }) => {
  const { session, signout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          <h1>Sports</h1>
          <nav>
            <ul id="MenuItems" className={menuOpen ? "menu active" : "menu"}>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/products">Produtos</Link>
              </li>
              {!session && (
                <li>
                  <Link to="/access">Acessar</Link>
                </li>
              )}
              {session && (
                <>
                  <li>
                    <Link to="/shopping">Meu Carrinho</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={signout}>
                      Sair
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <i className="bx bx-menu menu-toggle" onClick={toggleMenu} />
        </div>

        {isHome && (
          <div className="row">
            <div className="col">
              <h1>Produtos esportivos para você!</h1>
              <p>Conheça nosso estoque especial agora mesmo!</p>
              <button className="button" onClick={() => navigate("/products")}>
                Ver Produtos
              </button>
            </div>
            <div className="col">
              <img src={image} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
