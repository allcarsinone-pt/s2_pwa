'use client'
import { useEffect } from "react";
import Navbar from "./components/navbar";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <>
    <Navbar />
</>
}
export default MyApp;