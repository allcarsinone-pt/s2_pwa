"use client";
import Navbar from "../../components/navbar";
import { VehicleModel } from "../../models/vehicle";
import {
  fetchBrands,
  fetchGastype,
  insertVehicles,
} from "../../api/vehiclesAPI";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrandModel } from "@/app/models/brand";
import { GasTypeModel } from "@/app/models/gastype";
import AuthProvider, { useAuth } from "../../AuthProvider";
import { redirect } from "next/navigation";
import { validateAuth } from "../../api/usersAPI";
import { verifyAuth } from "@/app/api/utils/utils";
const InsertVehicles: React.FC = () => {

  const user = useAuth();
  let [username, setUsername] = useState(null);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    verifyAuth(user, (username:any) => {
      setUsername(username.username);
      console.log(username.username);
    });
  }, []);

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
    consume: 0,
    location: "",
    files: [],
  });

  const { data: brandsData, error: brandsError } = useQuery<BrandModel[]>({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    staleTime: 10000,
  });

  const { data: gasTypesData, error: gasTypesError } = useQuery<GasTypeModel[]>(
    {
      queryKey: ["gastypes"],
      queryFn: fetchGastype,
      staleTime: 10000,
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const [files, setFiles] = useState<any>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    // Converter boolean em string
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Converter boolean em string
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      
      
      const updatedFormData = {
        standid: 1, //formData.standid, //TODO: Obter valor pelo login. Token?
        brandid: formData.brandid?formData.brandid:1,
        model: formData.model,
        year: formData.year,
        price: formData.price,
        mileage: formData.mileage,
        gastypeid: formData.gastypeid?formData.gastypeid:1,
        availability: true,
        consume: formData.consume,
        description: formData.description,
        location: formData.location,
        files: files.map((file: File) => file.name),
      }

      console.log(updatedFormData);

      await insertVehicles(updatedFormData, files);
      window.location.href = `/vehicles`;
    } catch (error) {
      console.error(error);
    }
  };

  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  return (
    <>
      <Navbar username={username} />
      <p></p>
      <div className="container mt-6">
        <h1>Insert vehicle</h1>

        <form
          onSubmit={handleOnSubmit}
        >
          <div className="form-group">
            <label htmlFor="brands">Brands</label>
            <select
              id="brandid"
              name="brandid"
              className="form-control"
              value={formData.brandid}
              onChange={handleSelectChange}
            >
              {brandsData && brandsData.length > 0 ? (
                brandsData.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))
              ) : (
                <option value="-1">No Brands found</option>
              )}
            </select>
          </div>

          <input name="standid" type="hidden" value="1" />
          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              name="model"
              id="model"
              className="form-control"
              value={formData.model}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              name="year"
              id="year"
              className="form-control"
              value={formData.year}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              className="form-control"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" >Price</label>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mileage">Mileage</label>
            <input
              type="number"
              name="mileage"
              id="mileage"
              className="form-control"
              value={formData.mileage}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gasTypes">Gas type</label>
            <select
              id="gastypeid"
              name="gastypeid"
              className="form-control"
              value={formData.gastypeid}
              onChange={handleSelectChange}
            >
              {gasTypesData && gasTypesData.length > 0 ? (
                gasTypesData.map((gastype) => (
                  <option key={gastype.id} value={gastype.id}>
                    {gastype.name}
                  </option>
                ))
              ) : (
                <option value="-1">No Gastypes found</option>
              )}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="consume" >Consume</label>
            <input
              type="number"
              name="consume"
              id="consume"
              className="form-control"
              value={formData.consume}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" name="files" multiple onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={formData.description}
              onChange={handleTextareaChange}
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Insert vehicle
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const queryClient = new QueryClient();

const VehiclesRegisterPageQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <InsertVehicles />
  </QueryClientProvider>
);

export default VehiclesRegisterPageQueryClient;
