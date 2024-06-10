'use client'
import React, { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query';
import { fetchSingleVehicle, updateVehicle } from "../../../api/vehiclesAPI";
import { VehicleModel } from "../../../models/vehicle";
import Navbar from "../../../components/navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from "next/link";
import AuthProvider, { useAuth } from "../../../AuthProvider";
import { redirect } from "next/navigation";
import { validateAuth } from "../../../api/usersAPI";
import { verifyAuth } from "@/app/api/utils/utils";
import { VehicleDetailModel } from "@/app/models/vehicleDetail";

const EditVehiclesPage: React.FC = () => {


    const { data: vehicleData, error, isLoading } = useQuery<VehicleDetailModel>({
        queryKey: ['vehicles'],
        queryFn: () => fetchSingleVehicle(Number(window.location.pathname.split("/").pop()))
    })

    const user = useAuth();
    let [username, setUsername] = useState(null);
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");

        verifyAuth(user, (username:any) => {
            setUsername(username.username);
            console.log(username.username);
          });

        if (vehicleData) {
            setFormData(vehicleData)
        }
    }, [vehicleData]);


    const [formData, setFormData] = useState<VehicleDetailModel>({
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Converter boolean em string
        setFormData({
            ...formData,
            [name]: value === 'true',
        });
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                vehicleid: formData.id,
                standid: formData.standid,
                brandid: formData.brandid,
                gastypeid: formData.gastypeid,
                model: formData.model,
                year: formData.year,
                price: formData.price,
                mileage: formData.mileage,
                availability: formData.availability,
                description: formData.description
            };
            await updateVehicle(updatedFormData);
            window.location.href = `/vehicles/${formData.id}`;
        } catch (error) {
            console.error(error);
        }
    }

    return <>
        <Navbar username={username} />
        <p></p>
        <div className="container mt-6">
            <h1>Edit Vehicle</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="brandname">Brand</label>
                    <input type="text" className="form-control" name="brandname" id="brandname" value={formData.brandname} onChange={handleInputChange} disabled />
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
                    &nbsp;&nbsp;
                    {formData.availability ? <input type="checkbox" name="availability" id="availability" /> :
                        <input type="checkbox" name="availability" id="availability" defaultChecked />}
                </div>
                <input type="hidden" name="vehicleid" value={formData.id} id="vehicleid" />
                <input type="hidden" name="standid" value='1' id="standid" />
                <input type="hidden" name="brandid" value='1' id="brandid" />
                <input type="hidden" name="gastypeid" value='1' id="gastypeid" />
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        </div>
    </>
}

const queryClient = new QueryClient();

const EditVehiclesPageQueryClient = () => (
    <QueryClientProvider client={queryClient}>
        <EditVehiclesPage />
    </QueryClientProvider>
);

export default EditVehiclesPageQueryClient