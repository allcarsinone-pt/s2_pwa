import axios from "axios";
import { UserModel } from "../models/user";


export const login = async(email: String, password: String) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_AUTH}/auth`, {
        email,
        password
    })
    return data
}

export const validateAuth = async(token: string) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_AUTH}/auth`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}


export const fetchUsers = async (): Promise<UserModel[]> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_AUTH}/users`)
    return data
}

export const fetchSingleUser = async (username: string): Promise<UserModel> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_AUTH}/users/` + username)
    return data
}

export const registerUser = async (user: UserModel): Promise<UserModel> => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_AUTH}/users`, user)
    return data
}

export const editUser = async (user: UserModel): Promise<UserModel> => {
    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_API_AUTH}/users/${user.username}`, user)
    return data
}

export const deleteUser = async (username: string): Promise<void> => {
    const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API_AUTH}/users/` + username)
    return data
}

export const updateProfilePhoto = async (user: UserModel): Promise<UserModel> => {
    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_API_AUTH}/users/profile/photo`, user)
    return data
}

