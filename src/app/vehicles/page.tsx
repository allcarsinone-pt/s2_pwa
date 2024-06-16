'use client'
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { deleteVehicle, fetchVehicles, fetchVehiclesPaginated } from "../api/vehiclesAPI";
import { VehicleModel } from "../models/vehicle";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AuthProvider, { useAuth } from "../AuthProvider";
import { redirect } from "next/navigation";
import { validateAuth } from "../api/usersAPI";
import { verifyAuth } from "../api/utils/utils";

const VehiclesPage: React.FC = () => {

  const user = useAuth();
  let [username, setUsername] = useState(null);
  const [page, setPage] = useState(1);
  const prevPage = () => setPage((prev) => prev - 1);
  const nextPage = () => setPage((next) => next + 1);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");

    verifyAuth(user, (username: any) => {
      setUsername(username.username);
      console.log(username.username);
    });
  }, []);

  const { isLoading, isError, error, data, isPlaceholderData } = useQuery<VehicleModel[]>({
    queryKey: ['vehicles', page],
    queryFn: () => fetchVehiclesPaginated(page),
    placeholderData: keepPreviousData,
    staleTime: 600000
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(null);

  const deleteVehicleMutation = useMutation({
    mutationFn: (id: number) => deleteVehicle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    }
  });
  const handleOpenModal = (vehicle: VehicleModel | null) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedVehicle(null);
    setShowModal(false);
  };

  const handleDeleteVehicle = () => {
    if (selectedVehicle && selectedVehicle.id) {
      deleteVehicleMutation.mutate(selectedVehicle.id);
      handleCloseModal();
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <>
      <Navbar username={username} />
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
            {data && data.length > 0 ?
              (data.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.brandname}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.price}</td>
                  <td>{vehicle.mileage}</td>
                  <td>{vehicle.description}</td>
                  <td>{vehicle.availability ? '✓' : '✕'}</td>
                  <td>
                    <Link href={`vehicles/${vehicle.id}`}><FontAwesomeIcon icon={faEye} /></Link>&nbsp;&nbsp;
                    <Link href={`vehicles/edit/${vehicle.id}`}><FontAwesomeIcon icon={faEdit} color="black" /></Link>&nbsp;&nbsp;
                    <button type="button" style={{ border: 'none', background: 'none', verticalAlign: 'middle' }} className="btn btn-outline-danger btn-no-border p-0" onClick={() => handleOpenModal(vehicle)}><FontAwesomeIcon icon={faTrash} color="darkred" /></button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan={8}>No vehicles found.</td>
                </tr>
              )}
          </tbody>
        </table>


        <span>Current Page: {page}&nbsp;&nbsp;</span>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}>{'  <  '}</button>{' '}
        <button
          onClick={() => {
            if (!isPlaceholderData && data && data.length > 0) {
              setPage((old) => old + 1)
            }
          }}
          disabled={isPlaceholderData || !data || (data && data.length === 0)}
        > {'  >  '}
        </button>
      </div>

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Deleting {selectedVehicle?.brandname + " " + selectedVehicle?.model}</h5>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this vehicle?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteVehicle}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
    </>
  );
}

const queryClient = new QueryClient();

const VehiclesPageQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <VehiclesPage />
  </QueryClientProvider>
);

export default VehiclesPageQueryClient;
