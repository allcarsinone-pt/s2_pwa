'use client'
import { useEffect } from "react";
import { Query, useQuery } from '@tanstack/react-query';
import { fetchVehicles } from "../api/vehiclesAPI";
import { VehicleModel } from "../models/vehicle";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from "../components/navbar";

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
        <h1>Vehicles</h1>
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
            </tr>
          </thead>
          <tbody>
            {data && data.map((vehicle) => (
              <tr key={vehicle.vehicleId}>
                <td>{vehicle.brandid}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.price}</td>
                <td>{vehicle.mileage}</td>
                <td>{vehicle.description}</td>
                <td>{vehicle.availability ? 'Available' : 'Unavailable'}</td>
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
