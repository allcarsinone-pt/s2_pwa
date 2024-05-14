'use client'
import { useEffect } from "react";
import Navbar from "../components/navbar";

function TestDrives() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <>
    <Navbar />
  
    <label>Test Drives</label>
  </>
}
export default TestDrives;
