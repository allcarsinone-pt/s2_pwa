import { useQuery, useQueryClient, useMutation } from "react-query";
import vehiclesService from "../services/vehicles-service";

const useGetVehicles = () => {
    return useQuery(["vehicle"], () => vehiclesService.getVehicles());
}

const useGetVehicle = (id) => {
    return useQuery(["vehicle", id], () => vehiclesService.getVehicle(id));
}

const useDeleteVehicle = (id) => {
    const queryClient = useQueryClient();
    return useMutation((id) => vehiclesService.deleteVehicle(id), {
        onSuccess: () => queryClient.invalidateQueries("vehicles")
    });
}

const useUpdateVehicle = (vehicle) => {
    const queryClient = useQueryClient();
    return useMutation((vehicle) => vehiclesService.updateVehicle(vehicle), {
        onSuccess: () => queryClient.invalidateQueries("vehicle")
    });
}

export { useGetVehicles, useGetVehicle, useDeleteVehicle, useUpdateVehicle }