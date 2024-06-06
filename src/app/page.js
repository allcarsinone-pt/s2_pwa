"use client"
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { useAuth } from "./AuthProvider";
import { validateAuth } from "./api/usersAPI";
import { redirect } from "next/dist/server/api-utils";
import { verifyAuth } from "./api/utils/utils";
function MyApp({ Component, pageProps }) {
  const user = useAuth();
  let [username, setUsername] = useState(null);

  useEffect(() => {

   verifyAuth(user, (username) => {
      setUsername(username.username);
      console.log(username.username);
    });
  }, []);

  return (
    <>
      <Navbar username={username} />
    </>
  );
}

export default MyApp;