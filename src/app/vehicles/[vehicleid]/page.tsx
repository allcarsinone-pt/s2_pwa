'use client'
import React, { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query';
import { fetchSingleVehicle } from "../../api/vehiclesAPI";
import { VehicleModel } from "../../models/vehicle";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import AuthProvider, { useAuth } from "../../AuthProvider";
import { redirect } from "next/navigation";
import { validateAuth } from "../../api/usersAPI";

const VehiclesSinglePage: React.FC = () => {

    const { data: vehicleData, error, isLoading } = useQuery<VehicleModel>({
        queryKey: ['vehicles'],
        queryFn: () => fetchSingleVehicle(Number(window.location.pathname.split("/").pop())),
        staleTime: 10000
    })

    const user = useAuth();
    let [username, setUsername] = useState(null);
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");

        const token = user.isAuthenticated();
        if (!token) {
            redirect("/login");
        }

        validateAuth(token).then((username) => {
            if (!username) {
                redirect("/login");
            }

            setUsername(username.username);
            console.log(username.username);
        });

        if (vehicleData) {
            setFormData(vehicleData)
        }
    }, [vehicleData]);

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
        description: "",
        files: []
    })

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    return <>
        <>
            <Navbar username={username} />
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
                        &nbsp;&nbsp;
                        {formData.availability ? <input type="checkbox" name="availability" id="availability" /> :
                            <input type="checkbox" name="availability" id="availability" defaultChecked />}
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