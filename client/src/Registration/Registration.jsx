import { $api, setAccessToken } from "../../utils/axios.instance";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Registration() {
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();

    console.log("EVENT: ", event.target);
    const { login, email, password } = event.target;

    console.log("ELEMENTS: ", login, email, password);

    const data = {
      login: login.value,
      email: email.value,
      password: password.value,
    };

    $api.post("/users/register", data).then((response) => {
      console.log("DATA: ", response);
      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
        navigate("/");
      }
    });
  }

  return (
    <div>
      <Navbar />
      <h2>REGISTRATION</h2>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="login">Login</label>
        <input type="text" id="login" />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Registration;
