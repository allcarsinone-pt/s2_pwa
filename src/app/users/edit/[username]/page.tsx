'use client'
import React, { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query';
import { fetchSingleUser, editUser } from "../../../api/usersAPI";
import { UserModel } from "../../../models/user";
import Navbar from "../../../components/navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from "next/link";
const EditVehiclesPage: React.FC = () => {

    const { data: userData, error, isLoading } = useQuery<UserModel>({
        queryKey: ['users'],
        queryFn: () => fetchSingleUser(String(window.location.pathname.split("/").pop()))
    })

    const [formData, setFormData] = useState<UserModel>({
        id: 0,
        username: '',
        name: '',
        email: '',
        role_id: 0
    })

    useEffect(() => {
        if (userData) {
            setFormData(userData)
        }
        import("bootstrap/dist/js/bootstrap");
    }, [userData]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Converter boolean em string
        setFormData({
            ...formData,
            [name]: value === 'true',
        });
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                id: formData.id,
                username: formData.username,
                name: formData.name,
                email: formData.email,
                role_id: formData.role_id
            };
            await editUser(updatedFormData);
            window.location.href = `/users/${formData.username}`;
        } catch (error) {
            console.error(error);
        }
    }

    return <>
        <Navbar />
        <p></p>
        <div className="container mt-6">
            <h1>Edit User</h1>
            <form onSubmit={handleOnSubmit}>
                <input type="hidden" className="form-control" name="id" id="id" value={formData.id} />
                <input type="hidden" className="form-control" name="role_id" id="role_id" value={formData.role_id} />
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" id="username" value={formData.username} onChange={handleInputChange} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" id="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name="email" id="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Update user</button>

            </form>
        </div>
    </>
}

const queryClient = new QueryClient();

const EditVehiclesPageQueryClient = () => (
    <QueryClientProvider client={queryClient}>
        <EditVehiclesPage />
    </QueryClientProvider>
);

export default EditVehiclesPageQueryClient