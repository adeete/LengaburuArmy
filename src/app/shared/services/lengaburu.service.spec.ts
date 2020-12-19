import { TestBed } from "@angular/core/testing";
import { LengaburuService } from "./lengaburu.service";

describe("LengaburuService", () => {
  let service: LengaburuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LengaburuService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("attackFalcone request should be set before starting the search", () => {
    expect(
      service.sendTroops(
        ["Donlon", "Jebing", "Enchai", "Lerbin"],
        ["Space ship", "Space rocket", "Space pod", "Space ship"]
      )
    ).toEqual({
      token: "",
      planet_names: ["Donlon", "Jebing", "Enchai", "Lerbin"],
      vehicle_names: ["Space ship", "Space rocket", "Space pod", "Space ship"],
    });
  });
});
