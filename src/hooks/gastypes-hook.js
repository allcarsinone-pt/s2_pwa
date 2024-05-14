import { useQuery, useQueryClient, useMutation } from "react-query";
import GasTypesService from "../services/gastypes-service";

const useGetGasTypes = () => {
    return useQuery(["GasType"], () => GasTypesService.getGasTypes());
}

const useGetGasType = (id) => {
    return useQuery(["GasType", id], () => GasTypesService.getGasType(id));
}

const useDeleteGasType = (id) => {
    const queryClient = useQueryClient();
    return useMutation((id) => GasTypesService.deleteGasType(id), {
        onSuccess: () => queryClient.invalidateQueries("GasTypes")
    });
}

const useUpdateGasType = (gasType) => {
    const queryClient = useQueryClient();
    return useMutation((gasType) => GasTypesService.updateGasType(gasType), {
        onSuccess: () => queryClient.invalidateQueries("GasType")
    });
}

export { useGetGasTypes, useGetGasType, useDeleteGasType, useUpdateGasType }