import axios from "axios";
import { VehicleModel } from "../models/vehicle";

export const fetchVehicles = async (): Promise<VehicleModel[]> => {
    const { data } = await axios.get('http://localhost:3003/vehicles/')
    return data
}

export const fetchSingleVehicle = async (id: number): Promise<VehicleModel> => {
    const { data } = await axios.get(`http://localhost:3003/vehicles/${id}`)
    return data
}

export const insertVehicles = async (vehicle: VehicleModel): Promise<VehicleModel> => {
    const { data } = await axios.post('http://localhost:3003/vehicles/', vehicle)
    return data
}

export const updateVehicle = async (vehicle: VehicleModel): Promise<VehicleModel> => {
    const { data } = await axios.put(`http://localhost:3003/vehicles/edit`, vehicle)
    return data
}

export const deleteVehicle = async (id: number): Promise<String> => {
    const { data } = await axios.delete(`http://localhost:3003/vehicles/${id}`)
    return data
}
