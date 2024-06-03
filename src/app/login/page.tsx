"use client";
import Navbar from "@/app/components/navbar";
import { UserModel } from "@/app/models/user";
import { login } from "../api/usersAPI";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthModel } from "../models/auth";
import { signIn, signOut } from "next-auth/react";

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from "@/app/actions";


const LoginUser: React.FC = () => {

    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
   

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);



    return (
        <>
            <div className="container mt-6">
                <h1>Login</h1>
                <form action={dispatch}>
                 
                <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                          
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                        />
                    </div>
                  
                   
                   
                    L<LoginButton/>
                    {errorMessage && (
                    <>
             
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    </>
          )}
                </form>
            </div>
        </>
    );
};

function LoginButton() {
    const { pending } = useFormStatus();
   
    return (
      <button className="btn btn-primary" aria-disabled={pending}>
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
