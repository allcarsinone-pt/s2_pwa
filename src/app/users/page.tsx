'use client'
import { useEffect } from "react";
import Navbar from "../components/navbar";

function Users() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <>
    <Navbar />
  
    <label>Users</label>
  </>
}
export default Users;
