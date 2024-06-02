import axios from "axios";
import { VehicleModel } from "../models/vehicle";
import { BrandModel } from "../models/brand";
import { GasTypeModel } from "../models/gastype";

// Brands
export const fetchBrands = async (): Promise<BrandModel[]> => {
    const { data } = await axios.get('http://localhost:3003/brands/')
    return data
}

// GasTypes
export const fetchGastype = async (): Promise<GasTypeModel[]> => {
    const { data } = await axios.get('http://localhost:3003/gastypes/')
    return data
}

// Vehicles
export const fetchVehicles = async (): Promise<VehicleModel[]> => {
    const { data } = await axios.get('http://localhost:3003/vehicles/')
    return data
}

export const fetchSingleVehicle = async (id: number): Promise<VehicleModel> => {
    const { data } = await axios.get(`http://localhost:3003/vehicles/${id}`)
    return data
}

export const insertVehicles = async (vehicle: VehicleModel, files: File[]): Promise<VehicleModel> => {
    const formData = new FormData();
    formData.append('vehicle', JSON.stringify(vehicle));
    files.forEach((file) => {
        formData.append('file', file);
    });

    const { data } = await axios.post('http://localhost:3003/vehicles/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return { ...data };
};

export const updateVehicle = async (vehicle: VehicleModel): Promise<VehicleModel> => {
    const { data } = await axios.put(`http://localhost:3003/vehicles/edit`, vehicle)
    return data
}

export const deleteVehicle = async (id: number): Promise<void> => {
    console.log(id)
    await axios.delete(`http://localhost:3003/vehicles/` + id)
}
