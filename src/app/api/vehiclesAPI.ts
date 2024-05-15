import axios from "axios";
import { VehicleModel } from "../models/vehicle";

export const fetchVehicles = async (): Promise<VehicleModel[]> => {
    const { data } = await axios.get('https://mocki.io/v1/b3b4f675-90ef-4339-a1f2-42613d33e18b')
    return data
}