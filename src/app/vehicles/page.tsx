'use client'
import { useEffect } from "react";
import Navbar from "../components/navbar";
import InsertVehicles from "./vehicles-form";

function Vehicles() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <>
    <Navbar />


    <InsertVehicles></InsertVehicles>
    
  </>

  


}
export default Vehicles;
