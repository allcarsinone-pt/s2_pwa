import axios from "axios";
import { UserModel } from "../models/user";


export const fetchUsers = async (): Promise<UserModel[]> => {
    const { data } = await axios.get('http://localhost:3001/users/')
    return data
}

export const fetchUser = async (username: string): Promise<UserModel> => {
    const { data } = await axios.get('http://localhost:3001/users/' + username)
    return data
}

export const registerUser = async (user: UserModel): Promise<UserModel> => {
    const { data } = await axios.post('http://localhost:3001/users/', user)
    return data
}

export const editUser = async (user: UserModel): Promise<UserModel> => {
    const { data } = await axios.put('http://localhost:3001/users/' + user.username, user)
    return data
}

export const deleteUser = async (username: string): Promise<String> => {
    const { data } = await axios.delete('http://localhost:3001/users/' + username)
    return data
}

export const updateProfilePhoto = async (user: UserModel): Promise<UserModel> => {
    const { data } = await axios.put('http://localhost:3001/users/profile/photo', user)
    return data
}

