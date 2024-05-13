import axios from "axios";

class UsersService {
    async getUsers() {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        return response.data;
    }

    async getUser(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        return response.data;
    }

    async deleteUser(id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        return true;
    }

    async updateUser(user) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
        return response.data;
    }
}

export default new UsersService()