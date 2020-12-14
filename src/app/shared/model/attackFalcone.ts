export interface AttackFalcone {
  token: string;
  planet_names: string[];
  vehicle_names: string[];
}

export function initializeAttackFalconeRequest(): AttackFalcone {
  const attackFalconeArmyRequest: AttackFalcone = {
    token: '',
    planet_names: [],
    vehicle_names: [],
  };

  return attackFalconeArmyRequest;
}
