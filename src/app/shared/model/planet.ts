export interface Planet {
    name: string;
    distance: number;
}

export function findPlanet(planets: Planet[], selectedPlanet: string): number {
    if(!planets) return -1;
    return planets.findIndex(
        (oPlanet) => oPlanet.name.toString() === selectedPlanet.toString()
      );
}
