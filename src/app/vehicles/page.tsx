'use client'
import { useEffect } from "react";
import { Query, useQuery } from '@tanstack/react-query';
import { fetchVehicles } from "../api/vehiclesAPI";
import { VehicleModel } from "../models/vehicle";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const VehiclesPage: React.FC = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const { data, error, isLoading } = useQuery<VehicleModel[]>({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return <>
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="container">
          <h1>Vehicles</h1>
          <Link href="vehicles/register">
            <button type="button" className="btn btn-primary">
              Add Vehicle
            </button>
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price</th>
              <th>Mileage</th>
              <th>Description</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.brandname}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.price}</td>
                <td>{vehicle.mileage}</td>
                <td>{vehicle.description}</td>
                <td>{vehicle.availability ? 'Available' : 'Unavailable'}</td>
                <td>
                  <Link href={`vehicles/${vehicle.id}`}><FontAwesomeIcon icon={faEye} /></Link>&nbsp;&nbsp;
                  <Link href={`vehicles/edit/${vehicle.id}`}><FontAwesomeIcon icon={faEdit} /></Link>&nbsp;&nbsp;
                  <Link href={`vehicles/${vehicle.id}`}><FontAwesomeIcon icon={faTrash} /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  </>

}

const queryClient = new QueryClient();

const VehiclesPageQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <VehiclesPage />
  </QueryClientProvider>
);

export default VehiclesPageQueryClient;
