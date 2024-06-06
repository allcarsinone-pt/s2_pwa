export interface VehicleDetailModel {
    id?: number;
    vehicleid?: number;
    standid?: number;
    brandname: string;
    brandid?: number;
    gastypename: string;
    gastypeid: number;
    model: string;
    year: number;
    price: number;
    mileage: number;
    availability: boolean;
    description?: string;
    photos?: string[];
}