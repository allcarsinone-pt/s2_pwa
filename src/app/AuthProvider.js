"use client"
import { useContext, createContext, useState, useEffect } from "react";
import { login } from "./api/usersAPI";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import reddit from "next-auth/providers/reddit";
import { redirect } from "next/dist/server/api-utils";
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => () => {
        const storedToken = localStorage.getItem("token");
        return storedToken || null;
    });


    const loginAction = async (data) => {
        try {
            const response = await login(data.email, data.password);
            console.log(response);
            if (response.token) {
                localStorage.setItem("token", response.token);
                window.location.href = "/"
                return true;
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return <AuthContext.Provider value={{ isAuthenticated, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}