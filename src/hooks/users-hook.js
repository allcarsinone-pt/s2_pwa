import { useQuery, useQueryClient, useMutation } from "react-query";
import usersService from "../services/users-service";

const useGetUsers = () => {
    return useQuery(["users"], () => usersService.getUsers());
}

const useGetUser = (id) => {
    return useQuery(["users", id], () => usersService.getUser(id));
}

const useDeleteUser = (id) => {
    const queryClient = useQueryClient();
    return useMutation((id) => usersService.deleteUser(id), {
        onSuccess: () => queryClient.invalidateQueries("users")
    });
}

const useUpdateUser = (user) => {
    const queryClient = useQueryClient();
    return useMutation((user) => usersService.updateUser(user), {
        onSuccess: () => queryClient.invalidateQueries("users")
    });
}

export { useGetUsers, useGetUser, useDeleteUser, useUpdateUser }