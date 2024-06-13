"use client"
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { useAuth } from "./AuthProvider";
import { validateAuth } from "./api/usersAPI";
import { redirect } from "next/dist/server/api-utils";
import { verifyAuth } from "./api/utils/utils";
import { useQuery } from "react-query";

function MyApp({ Component, pageProps }) {
  const user = useAuth();
  let [username, setUsername] = useState(null);

  useEffect(() => {

    verifyAuth(user, (username) => {
      setUsername(username.username);
      console.log(username.username);
    });
  }, []);

  const { data, error, isLoading } = useQuery < undefined > ({
    queryKey: ['stats'],
    queryFn: () => standSales(1),
    staleTime: 10000
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <>
      <Navbar username={username} />
      {data}
    </>
  );
}

export default MyApp;