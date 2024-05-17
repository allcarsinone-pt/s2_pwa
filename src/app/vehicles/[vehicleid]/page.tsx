'use client'
import React, { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query';
import { fetchSingleVehicle } from "../../api/vehiclesAPI";
import { VehicleModel } from "../../models/vehicle";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from "next/link";
import Navbar from "@/app/components/navbar";

const VehiclesSinglePage: React.FC = () => {

    const { data: vehicleData, error, isLoading } = useQuery<VehicleModel>({
        queryKey: ['vehicles'],
        queryFn: () => fetchSingleVehicle(Number(window.location.pathname.split("/").pop()))
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

    return <>
        <>
            <Navbar />
            <p></p>
            <div className="container mt-6">
                <h1>{formData.brandname} {formData.model} Details</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="brandname">Brand</label>
                        <input type="text" className="form-control" name="brandname" id="brandname" value={formData.brandname} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input type="text" className="form-control" name="model" id="model" value={formData.model} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gastype">GasType name</label>
                        <input type="text" className="form-control" name="gastype" id="gastype" value={formData.gastypename} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input type="text" className="form-control" name="year" id="year" value={formData.year} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="text" className="form-control" name="price" id="price" value={formData.price} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mileage">Mileage</label>
                        <input type="text" className="form-control" name="mileage" id="mileage" value={formData.mileage} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" name="description" id="description" value={formData.description} disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availability">Availability</label>
                        <select className="form-control" name="availability" id="availability" value={String(formData.availability)} disabled >
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>
                    <Link href={`/vehicles`}><button className="btn btn-primary">Back</button></Link>

                </form>
            </div>
        </>
    </>
}

const queryClient = new QueryClient();

const VehiclesSinglePageQueryClient = () => (
    <QueryClientProvider client={queryClient}>
        <VehiclesSinglePage />
    </QueryClientProvider>
);

export default VehiclesSinglePageQueryClient