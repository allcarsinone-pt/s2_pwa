'use client'
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Query, useQuery } from '@tanstack/react-query';
import { deleteUser, fetchUsers } from "../api/usersAPI";
import { UserModel } from "../models/user";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const UsersPage: React.FC = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const { data, error, isLoading } = useQuery<UserModel[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 600000
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  const handleOpenModal = (vehicle: UserModel | null) => {
    setSelectedUser(vehicle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleDeleteUser = () => {
    if (selectedUser && selectedUser.username) {
      let result = deleteUser(selectedUser.username);
      console.log(selectedUser.username);
      handleCloseModal();
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return <>
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="container">
          <h1>Users</h1>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Mobile Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.mobilephone}</td>
                <td>
                  <Link href={`users/${user.username}`}><FontAwesomeIcon icon={faEye} /></Link>&nbsp;&nbsp;
                  <Link href={`users/edit/${user.username}`}><FontAwesomeIcon icon={faEdit} color="black" /></Link>&nbsp;&nbsp;
                  <button type="button" style={{ border: 'none', background: 'none', verticalAlign: 'middle' }} className="btn btn-outline-danger btn-no-border p-0" onClick={() => handleOpenModal(user)}><FontAwesomeIcon icon={faTrash} color="darkred" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Deleting {selectedUser?.name}</h5>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this user?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>

    </>
  </>

}

const queryClient = new QueryClient();

const UsersPageQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <UsersPage />
  </QueryClientProvider>
);

export default UsersPageQueryClient