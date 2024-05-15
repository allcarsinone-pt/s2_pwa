'use client'
import React, { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query';
import { fetchSingleVehicle, updateVehicle } from "../../../api/vehiclesAPI";
import { VehicleModel } from "../../../models/vehicle";
import Navbar from "../../../components/navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const EditVehiclesPage: React.FC = () => {

    const { data: vehicleData, error, isLoading } = useQuery<VehicleModel>({
        queryKey: ['vehicles'],
        queryFn: () => fetchSingleVehicle(1)
    })

    const [formData, setFormData] = useState<VehicleModel>({
        id: 0,
        standid: 0,
        brandname: "",
        gastypeid: 0,
        model: "",
        year: 0,
        price: 0,
        mileage: 0,
        availability: false,
        description: ""
    })

    useEffect(() => {
        if (vehicleData) {
            setFormData(vehicleData)
        }
        import("bootstrap/dist/js/bootstrap");
    }, [vehicleData]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    return <>
        <>
            <Navbar />
            <p></p>
            <div className="container mt-6">
                <h1>Edit Vehicle</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="brandname">Brand</label>
                        <input type="text" className="form-control" name="brandname" id="brandname" value={formData.brandname} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input type="text" className="form-control" name="model" id="model" value={formData.model} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input type="text" className="form-control" name="year" id="year" value={formData.year} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="text" className="form-control" name="price" id="price" value={formData.price} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mileage">Mileage</label>
                        <input type="text" className="form-control" name="mileage" id="mileage" value={formData.mileage} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" name="description" id="description" value={formData.description} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availability">Availability</label>
                        <input type="text" className="form-control" name="availability" id="availability" value={formData.availability ? "true" : "false"} onChange={handleInputChange} />
                    </div>
                    <p></p>
                    <button id="updateVehicleButton" type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
        </>
    </>
}

const queryClient = new QueryClient();

const EditVehiclesPageQueryClient = () => (
    <QueryClientProvider client={queryClient}>
        <EditVehiclesPage />
    </QueryClientProvider>
);

export default EditVehiclesPageQueryClient