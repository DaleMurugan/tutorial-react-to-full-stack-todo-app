import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useGlobalUserContext } from "../context";
import Login from "./Login";
import Main from "./Main";

export default function Pages() {
  const { user, setUser } = useGlobalUserContext();
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    isUserSignedIn();
  }, []);

  useEffect(() => {
    if (user) {
      setAuth(true);
      window.localStorage.setItem("auth", "true");
    }
  }, [user]);

  const isUserSignedIn = async () => {
    const activeUserSession = await Auth.currentAuthenticatedUser();
    if (activeUserSession) {
      setUser(activeUserSession);
    } else {
      window.localStorage.setItem("auth", "false");
    }
  };

  return (
    <>
      <Routes>
        {auth ? (
          <>
            <Route path="/" element={<Main />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Login />}></Route>
          </>
        )}
        ;
      </Routes>
    </>
  );
}
