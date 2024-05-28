
"use client";
import { VehicleModel } from "../../models/vehicle";
import { fetchBrands, fetchGastype, insertVehicles } from "../../api/vehiclesAPI"
import React, { useEffect, useRef, useState } from "react"
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrandModel } from "@/app/models/brand";
import { GasTypeModel } from "@/app/models/gastype";

const InsertVehicles: React.FC = () => {

  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  function handleChange(e: any) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files?.[0]) {
      console.log(e.target.files);
      for (const file of e.target.files) {
        setFiles((prevState: any) => [...prevState, file]);
      }
    }
  }

  function handleSubmit(e: any) {
    if (files.length === 0) {
      // no file has been submitted
    } else {
      // write submit logic here
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      for (const file of e.dataTransfer.files) {
        setFiles((prevState: any) => [...prevState, file]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

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

  const { data: brandsData, error: brandsError } = useQuery<BrandModel[]>({
    queryKey: ['brands' ],
    queryFn: fetchBrands,
    staleTime: 10000
  })

  const { data: gasTypesData, error: gasTypesError } = useQuery<GasTypeModel[]>({
    queryKey: ['gastypes'],
    queryFn: fetchGastype,
    staleTime: 10000
  })

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
        [name]: value,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Converter boolean em string
    setFormData({
        ...formData,
        [name]: value
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const updatedFormData = {
            standid: 1, //formData.standid,
            brandid: formData.brandid,
            model: formData.model,
            year: formData.year,
            price: formData.price,
            mileage: formData.mileage,
            gastypeid: formData.gastypeid,
            availability: true,
            description: formData.description
        };
        await insertVehicles(updatedFormData);
        window.location.href = `/vehicles/${formData.id}`;
    } catch (error) {
        console.error(error);
    }
  }

  return (

    <div className="container mt-5">
      <h1>Insert vehicle</h1>

      <form onSubmit={handleOnSubmit}
      //onDragEnter={handleDragEnter}  
      //onDrop={handleDrop} 
      //onDragLeave={handleDragLeave} 
      //onDragOver={handleDragOver}
      >

        <div className="form-group row">
          <label htmlFor="brands" className="col-sm-2 col-form-label">Brands</label>
          <div className="col-sm-10">
            <select id="brandid" name="brandid" className="form-control" value={formData.brandid} onChange={handleSelectChange} >
              {(brandsData && brandsData.length > 0) ? (
                brandsData.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))
              ) : (
                <option value="-1">No Brands found</option>
              )}
              </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="model" className="col-sm-2 col-form-label">Model</label>
          <div className="col-sm-10">
            <input type="text" name="model" id="model" className="form-control" value={formData.model} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="year" className="col-sm-2 col-form-label">Year</label>
          <div className="col-sm-10">
            <input type="number" name="year" id="year" className="form-control" value={formData.year} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
          <div className="col-sm-10">
            <input type="number" name="price" id="price" className="form-control" value={formData.price} onChange={handleInputChange} />
          </div>
        </div>
        
        <div className="form-group row">
          <label htmlFor="mileage" className="col-sm-2 col-form-label">Mileage</label>
          <div className="col-sm-10">
            <input type="number" name="mileage" id="mileage" className="form-control" value={formData.mileage} onChange={handleInputChange} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="gasTypes" className="col-sm-2 col-form-label">Gas type</label>
          <div className="col-sm-10">
            <select name="gastypeid" id="gastypeid" className="form-control" value={formData.gastypeid} onChange={handleSelectChange} >
              {(gasTypesData && gasTypesData.length > 0) ? (
                gasTypesData.map((gastype) => (
                  <option key={gastype.id} value={gastype.id}>{gastype.name}</option>
                ))
              ) : (
                <option value="-1">No Gas Types found</option>
              )}
              </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="" className="col-sm-2 col-form-label">Image</label>
          <div className="col-sm-10">
          <div className={`${dragActive ? "bg-light" : "bg-body" } form-control text-center flex flex-col`}>
            <input placeholder="fileInput" className="hidden" ref={inputRef} type="file" multiple={true} onChange={handleChange} 
            accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" hidden />
            <p>
              Drag & Drop files or{" "}
              <button onClick={openFileExplorer} style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>
                Select files
              </button>{" "}
              to upload
            </p>
            <div className="flex flex-col items-center p-3">
              {files.map((file: any, idx: any) => (
                <div key={file.name} className="flex flex-row space-x-5">
                  <span>{file.name}</span>
                  {" "}
                  <button className="bg-danger" onClick={() => removeFile(file.name, idx)} onKeyDown={(e) => e.key === 'Enter' && removeFile(file.name, idx)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <textarea name="description" id="description" className="form-control" value={formData.description}  onChange={handleTextareaChange} ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary">Insert vehicle</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const queryClient = new QueryClient();

const VehiclesRegisterPageQueryClient = () => (
    <QueryClientProvider client={queryClient}>
        <InsertVehicles />
    </QueryClientProvider>
);

export default VehiclesRegisterPageQueryClient