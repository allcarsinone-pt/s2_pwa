'use client'

import React, { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query';
import { fetchSingleUser } from "../../api/usersAPI";
import { UserModel } from "../../models/user";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from "next/link";
import Navbar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import AuthProvider, { useAuth } from "../../AuthProvider";
import { redirect } from "next/navigation";
import { validateAuth } from "../../api/usersAPI";

const UsersSinglePage: React.FC = () => {

    const user = useAuth();
    let [username, setUsername] = useState(null);
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");

        const token = user.isAuthenticated();
        if (!token) {
            redirect("/login");
        }

        validateAuth(token).then((username) => {
            if (!username) {
                redirect("/login");
            }

            setUsername(username.username);
            console.log(username.username);
        });
    }, []);

    const { data: userData, error, isLoading } = useQuery<UserModel>({
        queryKey: ['users'],
        queryFn: () => fetchSingleUser(String(window.location.pathname.split("/").pop())),
        staleTime: 10000
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    return <>
        <>
            <Navbar username={username} />
            <p></p>
            <div className="container mt-6">
                <h1>{userData?.username} Details</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" id="username" value={userData?.username} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" id="name" value={userData?.name} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" id="email" value={userData?.email} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control" name="address" id="address" value={userData?.address} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" name="city" id="city" value={userData?.city} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalcode">Postalcode</label>
                        <input type="text" className="form-control" name="postalcode" id="postalcode" value={userData?.postalcode} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobilephone">Mobilephone</label>
                        <input type="text" className="form-control" name="mobilephone" id="mobilephone" value={userData?.mobilephone} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photo</label>
                        <img className="form-control" src={userData?.photo} />
                    </div>
                </form>
            </div>
        </>
    </>

}

const queryClient = new QueryClient();

const UsersSinglePageQueryClient = () => (
    <QueryClientProvider client={queryClient}>
        <UsersSinglePage />
    </QueryClientProvider>
);

export default UsersSinglePageQueryClient

