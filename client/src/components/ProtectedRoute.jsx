import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import React from "react";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const response = await axios(
          "http://localhost:4000/api/tokens/refresh",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setIsAuth(true);
          setUserData(response.data.user);
        } else {
          setIsAuth(false);
          setUserData(null);
        }
      } catch (error) {
        setIsAuth(false);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  console.log("IS AUTH: ", isAuth);
  console.log("IS Loading: ", isLoading);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!isAuth) {
    return <Navigate to={"/login"} replace />;
  }

  return React.cloneElement(children, {
    user: userData,
  });
}

export default ProtectedRoute;
