import { useQuery, useQueryClient, useMutation } from "react-query";
import brandsService from "../services/brands-service";

const useGetBrands = () => {
    return useQuery(["brands"], () => brandsService.getBrands());
}

const useGetBrand = (id) => {
    return useQuery(["brands", id], () => brandsService.getBrand(id));
}

const useDeleteBrand = (id) => {
    const queryClient = useQueryClient();
    return useMutation((id) => brandsService.deleteBrand(id), {
        onSuccess: () => queryClient.invalidateQueries("brands")
    });
}

const useUpdateBrand = (brand) => {
    const queryClient = useQueryClient();
    return useMutation((brand) => brandsService.updateBrand(brand), {
        onSuccess: () => queryClient.invalidateQueries("brands")
    });
}

export { useGetBrands, useGetBrand, useDeleteBrand, useUpdateBrand }