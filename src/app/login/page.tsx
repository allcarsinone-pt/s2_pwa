"use client";


import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./login.css"

import { useFormState, useFormStatus } from 'react-dom';
import email from "next-auth/providers/email";
import { useAuth } from "../AuthProvider";
import { useSearchParams } from "next/navigation";
import Image from "next/image";



const LoginUser: React.FC = () => {

    //const [errorMessage, dispatch] = useFormState(authenticate, undefined);
   

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    const [crendentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const searchParams = useSearchParams()
    const error = searchParams.get("error")

    const auth = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(crendentials.email !== "" && crendentials.password !== "") {
            const response = await auth.loginAction(crendentials);
            if(response) {
                window.location.href = "/"
            }
            else {
               window.location.href="/login?error=true"
            }
            return;
        }

        alert("Please enter email and password");
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...crendentials, [name]: value })
    }
    
    
    console.log(JSON.stringify(process.env))
    return (
        <>
        
        <div className="Auth-form-container">
          
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
        <div className="text-center">
        <Image className="align-center"src="/logotipo.png" alt="logo" width={190} height={68}/>
        </div>
          <br/>
          <h3 className="Auth-form-title">Sign In</h3>
          
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          {error && <p  className="fw-bold text-center text-danger">Invalid credentials</p>}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            
          </div>
        </div>
      </form>
    </div>
        </>
    );
};

function LoginButton() {
    const { pending } = useFormStatus();
   
    return (
      <button type="submit" className="btn btn-primary btn-block mb-4" aria-disabled={pending}>
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
