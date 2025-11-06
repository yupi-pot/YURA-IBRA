import { Outlet, Link, useNavigate } from "react-router-dom";
import { $api } from "../../utils/axios.instance";

const Layout = ({ user }) => {
  const navigate = useNavigate();

  function logoutHandler() {
    $api("/users/logout").then((response) => {
      if (response.status === 200) {
        navigate("/login");
      }
    });
  }

  return (
    <>
      <header>
        Hello {user ? user.login : "Guest"}, Добро пожаловать в автошколу Speed!
        <nav style={{ display: "flex", gap: 30 }}>
          <Link to={"/"}>MAIN</Link>
          {user ? (
            <button onClick={logoutHandler}>logout</button>
          ) : (
            <>
              <Link to={"/login"}>LOGIN</Link>
              <Link to={"/registration"}>REGISTRATION</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>FOOTER</footer>
    </>
  );
};

export default Layout;
