
"use client";

import { useRef, useState } from "react";
const InsertVehicles = () => {
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

  return (

    <div className="container mt-5">
      <h1>Insert vehicle</h1>

      <form method="POST" action="#"
      onDragEnter={handleDragEnter} 
      onSubmit={(e) => e.preventDefault()} 
      onDrop={handleDrop} 
      onDragLeave={handleDragLeave} 
      onDragOver={handleDragOver}>

        <div className="form-group row">
          <label htmlFor="model" className="col-sm-2 col-form-label">Model</label>
          <div className="col-sm-10">
            <input type="text" name="model" id="model" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="year" className="col-sm-2 col-form-label">Year</label>
          <div className="col-sm-10">
            <input type="number" name="year" id="year" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="mileage" className="col-sm-2 col-form-label">Mileage</label>
          <div className="col-sm-10">
            <input type="number" name="mileage" id="mileage" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
          <div className="col-sm-10">
            <input type="number" name="price" id="price" className="form-control" />
          </div>
        </div>
        
        <div className="form-group row">
          <label htmlFor="brand" className="col-sm-2 col-form-label">Brand</label>
          <div className="col-sm-10">
            <input type="text" name="brand" id="brand" className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="gasTypes" className="col-sm-2 col-form-label">Gas type</label>
          <div className="col-sm-10">
            <select name="gasTypes" id="gasTypes" className="form-control">
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="brands" className="col-sm-2 col-form-label">Brands</label>
          <div className="col-sm-10">
            <select id="brands" name="brands" className="form-control">
              <option value="Audi">Audi</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Volkswagen">Volkswagen</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="model" className="col-sm-2 col-form-label">Image</label>

          
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
            <textarea name="description" id="description" className="form-control"></textarea>
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

export default InsertVehicles