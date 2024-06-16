import axios from "axios";
import { VehicleModel } from "../models/vehicle";
import { BrandModel } from "../models/brand";
import { GasTypeModel } from "../models/gastype";
import { VehicleDetailModel } from "../models/vehicleDetail";
import { StatsModel } from "../models/stats";

// Brands
export const fetchBrands = async (): Promise<BrandModel[]> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_VEHICLES}/brands/`)
    return data
}

// GasTypes
export const fetchGastype = async (): Promise<GasTypeModel[]> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_VEHICLES}/gastypes/`)
    return data
}

// Vehicles
export const fetchVehicles = async (): Promise<VehicleModel[]> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_VEHICLES}/vehicles/`)
    return data
}

export const fetchVehiclesPaginated = async (page: number): Promise<VehicleModel[]> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_VEHICLES}/vehicles/pagination/${page}`)
    return data
}

export const fetchSingleVehicle = async (id: number): Promise<VehicleDetailModel> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_VEHICLES}/vehicles/${id}`)
    return data
}

export const insertVehicles = async (vehicle: VehicleModel, files: File[]): Promise<VehicleModel> => {
    const formData = new FormData();
    formData.append('vehicle', JSON.stringify(vehicle));
    files.forEach((file) => {
        formData.append('file', file);
    });

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_VEHICLES}/vehicles/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return { ...data };
};

export const updateVehicle = async (vehicle: VehicleModel, id: number): Promise<VehicleModel> => {
    console.log(id)
    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_API_VEHICLES}/vehicles/${id}`, vehicle)
    return data
}

export const deleteVehicle = async (id: number): Promise<void> => {
    console.log(id)
    await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API_VEHICLES}/vehicles/` + id)
}

// Stand sales
export const standSales = async (standid: number): Promise<StatsModel> => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API_VEHICLES}/vehicles/stands/stats/` + standid)
    return data
}