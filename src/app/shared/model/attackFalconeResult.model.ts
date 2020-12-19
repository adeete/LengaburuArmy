import { Deserializable } from "./deserializable.model";

export class AttackFalconeResult implements Deserializable{
    status: string = "";
    planetName: string = "";

    deserialize(input: any): this {
        this.status = input.status;
        this.planetName = input.planet_name;
        return this;
    }
}