export interface VehicleDetailModel {
    id?: number;
    vehicleid?: number;
    standid?: number;
    brandname?: string;
    brandid?: number;
    gastypename?: string;
    gastypeid?: number;
    model: string;
    year: number;
    location?: string;
    price: number;
    mileage: number;
    consume: number;
    availability: boolean;
    description?: string;
    photos?: string[];
    files?: string[];
}