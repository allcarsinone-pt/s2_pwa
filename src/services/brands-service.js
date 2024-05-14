import axios from "axios";

class BrandsService {
    async getBrands() {
        const response = await axios.get("https://jsonplaceholder.typicode.com/brands");
        return response.data;
    }

    async getBrand(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/brands/${id}`);
        return response.data;
    }

    async deleteBrand(id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/brands/${id}`);
        return true;
    }

    async updateBrand(brand) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/brands/${brand.id}`, brand);
        return response.data;
    }
}

module.exports = BrandsService;