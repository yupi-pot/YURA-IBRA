import { $api, setAccessToken } from "../../utils/axios.instance";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Login() {
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    const { login, password } = event.target;
    const data = {
      login: login.value,
      password: password.value,
    };

    $api
      .post("/users/login", data)
      .then((data) => {
        console.log("DATA: ", data);
        setAccessToken(data.data.accessToken);
        navigate("/");
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  }

  return (
    <div>
      <Navbar />
      <h2>LOGIN</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="login">Login</label>
        <input type="text" id="login" />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
