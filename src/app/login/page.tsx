"use client";


import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import { useFormState, useFormStatus } from 'react-dom';
import email from "next-auth/providers/email";
import { useAuth } from "../AuthProvider";



const LoginUser: React.FC = () => {

    //const [errorMessage, dispatch] = useFormState(authenticate, undefined);
   

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    const [crendentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const auth = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(crendentials.email !== "" && crendentials.password !== "") {
            auth.loginAction(crendentials);
            return;
        }

        alert("Please enter email and password");
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...crendentials, [name]: value })
    }



    return (
        <>
            <div className="container mt-6">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                 
                <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            onChange={handleInput}
                          
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            onChange={handleInput}
                        />
                    </div>
                  
                   
                   
                    <LoginButton/>
                </form>
            </div>
        </>
    );
};

function LoginButton() {
    const { pending } = useFormStatus();
   
    return (
      <button type="submit" className="btn btn-primary" aria-disabled={pending}>
        Log in
      </button>
    );
}

const queryClient = new QueryClient();

const LoginPageQueryClient = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <LoginUser/>
        </QueryClientProvider>
    );
};

export default LoginPageQueryClient;
