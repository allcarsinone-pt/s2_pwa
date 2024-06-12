'use client'
import React, { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchSingleVehicle } from "../../api/vehiclesAPI";
import { VehicleDetailModel } from "@/app/models/vehicleDetail";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from "next/link";
import Navbar from "@/app/components/navbar";
import AuthProvider, { useAuth } from "../../AuthProvider";
import { verifyAuth } from "@/app/api/utils/utils";

const VehiclesSinglePage: React.FC = () => {
    const { data: vehicleData, error, isLoading } = useQuery<VehicleDetailModel>({
        queryKey: ['vehicles'],
        queryFn: () => fetchSingleVehicle(Number(window.location.pathname.split("/").pop())),
        staleTime: 10000
    });

    const [activeSlide, setActiveSlide] = useState(0);
    const [nImages, setNImages] = useState(0);

    const handlePrevClick = () => {
        setActiveSlide((prevSlide) => (prevSlide === 0 ? nImages - 1 : prevSlide - 1));
    };

    const handleNextClick = () => {
        setActiveSlide((prevSlide) => (prevSlide === nImages - 1 ? 0 : prevSlide + 1));
    };

    const user = useAuth();
    let [username, setUsername] = useState(null);

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");

        verifyAuth(user, (username: any) => {
            setUsername(username.username);
            console.log(username.username);
        });

        if (vehicleData) {
            setFormData(vehicleData);
            setNImages(vehicleData.photos.length);
        }
    }, [vehicleData]);

    const [formData, setFormData] = useState<VehicleDetailModel>({
        id: 0,
        vehicleid: 0,
        standid: 0,
        brandname: "",
        brandid: 0,
        gastypename: "",
        gastypeid: 0,
        model: "",
        year: 0,
        price: 0,
        mileage: 0,
        availability: true,
        description: "",
        photos: [],
        consume: 0,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <>
            <Navbar username={username} />
            <p></p>
            <div className="container mt-6">
                <h1>{formData.brandname} {formData.model} Details</h1>
                <form>
                    <h1></h1>

                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            {formData.photos && formData.photos.length > 0 && (
                                formData.photos.map((photo, index) => (
                                    <div key={index} className={`carousel-item ${activeSlide === index ? 'active' : ''}`}>
                                        <img src={`http://allcarsinone.pt:8080${photo.url.replace('src/static', '')}`} alt={`Photo ${index + 1}`} width={1000} height={500} />
                                    </div>
                                ))
                            )}
                        </div>

                        <a className="carousel-control-prev" role="button" data-slide="prev" onClick={handlePrevClick}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" role="button" data-slide="next" onClick={handleNextClick}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

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
                        <label htmlFor="consume">Consume</label>
                        <input type="number" className="form-control" name="consume" id="consume" value={formData.consume} disabled />
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
                        <input type="checkbox" name="availability" id="availability" checked={formData.availability} disabled />
                    </div>
                    <Link href={`/vehicles`}><button className="btn btn-primary">Back</button></Link>
                </form>
            </div>
        </>
    );
}

const queryClient = new QueryClient();

const VehiclesSinglePageQueryClient = () => (
    <QueryClientProvider client={queryClient}>
        <VehiclesSinglePage />
    </QueryClientProvider>
);

export default VehiclesSinglePageQueryClient;
