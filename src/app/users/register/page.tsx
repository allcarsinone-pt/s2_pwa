"use client";
import Navbar from "@/app/components/navbar";
import { UserModel } from "@/app/models/user";
import { registerUser } from "../../api/usersAPI";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const InsertUser: React.FC = () => {
    const [formData, setFormData] = useState<UserModel>({
        id: 0,
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        role_id: 0
    });

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                name: formData.name,
                username: formData.username,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                email: formData.email,
                role_id: formData.role_id
            };
            await registerUser(updatedFormData);
            window.location.href = `/users/${formData.username}`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-6">
                <h1>User Register</h1>
                <form onSubmit={handleOnSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role_id">Role ID</label>
                        <input
                            type="number"
                            className="form-control"
                            name="role_id"
                            id="role_id"
                            value={formData.role_id}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

const queryClient = new QueryClient();

const UserRegisterPageQueryClient = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <InsertUser />
        </QueryClientProvider>
    );
};

export default UserRegisterPageQueryClient;
