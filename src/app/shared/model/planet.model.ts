import { Deserializable } from "./deserializable.model";

export class Planet implements Deserializable{
  name: string = "";
  distance: number = 0;
  canBeSelected: boolean = true;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
