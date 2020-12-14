import { viewClassName } from "@angular/compiler";

export interface Vehicle {
    name: string;
    total_no: number;
    max_distance: number;
    speed: number;
}

export function findVehicle(vehicles: Vehicle[], selectedVehicle: string): number {
    if(!vehicles) return -1;
    return vehicles.findIndex(
        (vehicle) => vehicle.name === selectedVehicle
      );
}