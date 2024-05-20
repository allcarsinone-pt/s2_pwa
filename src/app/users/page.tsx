'use client'
import { useEffect } from "react";
import Navbar from "../components/navbar";
import { Query, useQuery } from '@tanstack/react-query';
import { fetchUsers } from "../api/usersAPI";
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
                  <Link href={`users/${user.id}`}><FontAwesomeIcon icon={faEye} /></Link>&nbsp;&nbsp;
                  <Link href={`users/edit/${user.id}`}><FontAwesomeIcon icon={faEdit} color="black" /></Link>&nbsp;&nbsp;
                  <Link href={'#'}><FontAwesomeIcon icon={faTrash} color="darkred" /></Link>
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

const UsersPageQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <UsersPage />
  </QueryClientProvider>
);

export default UsersPageQueryClient