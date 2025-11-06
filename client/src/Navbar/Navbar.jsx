import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/">Главная</Link>
      <Link to="/login">Вход</Link>
      <Link to="/registration">Регистрация</Link>
    </nav>
  );
}

export default Navbar;
