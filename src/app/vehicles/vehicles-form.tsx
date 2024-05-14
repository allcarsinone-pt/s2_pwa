import React, { useState } from "react"

const InsertVehicles = () => {
  return (
    <div>
      <h1>Insert vehicle</h1>
      <form method="POST" action="#">
        
        <div>
          <label htmlFor="stands">Stand</label>
          <select name="stands">
            <option value="1">Stand do Zé</option>
            <option value="2">Stand do Quim</option>
            <option value="3">Stand do Tone</option>
          </select>

        </div>

        <div>
          <label htmlFor="model">Model</label>
          <input type="text" name="model" />
        </div>

        <div>
          <label htmlFor="year">Year</label>
          <input type="number" name="year" />
        </div>

        <div>
          <label htmlFor="mileage">Mileage</label>
          <input type="number" name="mileage" />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" />
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input type="text" name="brand" />
        </div>

        <div>
          <label htmlFor="gasTypes">Gastypes</label>
          <select name="gasTypes">
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label htmlFor="brands">Brands</label>
          <select id="brands" name="brands">
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Volkswagen">Volkswagen</option>
          </select>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description"></textarea>
        </div>

        <button type="submit">Insert vehicle</button>
      </form>
    </div>
  );
};

export default InsertVehicles