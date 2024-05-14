import axios from "axios";

class VehiclesService {
    async getVehicles() {
        const response = await axios.get("https://jsonplaceholder.typicode.com/vehicles");
        return response.data;
    }

    async getVehicle(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/vehicles/${id}`);
        return response.data;
    }

    async deleteVehicle(id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/vehicles/${id}`);
        return true;
    }

    async updateVehicle(vehicle) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/vehicles/${vehicle.id}`, vehicle);
        return response.data;
    }
}

module.exports = VehiclesService;