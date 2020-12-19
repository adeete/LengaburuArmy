import { Deserializable } from "./deserializable.model";

export class Vehicle implements Deserializable{
    name: string = "";
    totalNo: number = 0;
    maxDistance: number = 0;
    speed: number = 0;
    
    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    canBeSelected(distance: number): boolean {
        return this.totalNo > 0 && this.maxDistance >= distance;
    }

    updateTotalNo(byN: number) {
        this.totalNo += byN;
    }

}