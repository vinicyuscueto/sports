import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import image from "../../assets/img/image.png";
import "./style.css";

const Auth = ({ isSignup }) => {
  const { signin, signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignin, setIsSignin] = useState(!isSignup);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!email || !password) {
      return alert("Preencha todos os campos.");
    }

    const fn = isSignin ? signin : signup;
    const result = await fn(email, password);

    if (!result.success) {
      return alert(result.message);
    }

    alert(isSignin ? "Acesso realizado." : "Cadastro realizado.");
    if (isSignin) navigate("/");
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={image} alt="Sports" />
          </div>
          <div className="col">
            <div className="auth-box">
              <h2>{!isSignin ? "Cadastro" : "Acesso"}</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAuth();
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                />
                <button type="submit" className="button">
                  {isSignin ? "Acessar" : "Cadastrar"}
                </button>
                <button
                  type="button"
                  className="button-label"
                  onClick={() => setIsSignin(!isSignin)}
                >
                  {isSignin
                    ? "Não é cadastrado? Clique aqui!"
                    : "Já é cadastrado? Clique aqui!"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
