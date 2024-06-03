"use client"
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { useAuth } from "./AuthProvider";
import { validateAuth } from "./api/usersAPI";
import { redirect } from "next/dist/server/api-utils";
function MyApp({ Component, pageProps }) {
  const user = useAuth();
  let [username, setUsername] = useState(null);

  useEffect(() => {
    const token = user.isAuthenticated();
    if (!token) {
      redirect("/login");
    }

    validateAuth(token).then((username) => {
      if (!username) {
       redirect("/login");
      }

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