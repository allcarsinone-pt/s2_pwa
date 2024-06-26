export interface VehicleModel {
    id?: number;
    vehicleid?: number;
    standid?: number;
    brandname?: string;
    brandid?: number;
    gastypename?: number;
    gastypeid: number;
    model: string;
    year: number;
    price: number;
    mileage: number;
    location?:string;
    availability: boolean;
    consume: number;
    description: string;
    files?: string[];
}