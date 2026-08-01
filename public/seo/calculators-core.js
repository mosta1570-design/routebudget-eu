function requireFiniteNonNegative(value, name) {
  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError(`${name} must be a finite, non-negative number`);
  }
}

function requirePositive(value, name) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new TypeError(`${name} must be a finite number greater than zero`);
  }
}

export function calculateCostPerKm(input) {
  requirePositive(input.loadedKm, 'loadedKm');
  requireFiniteNonNegative(input.emptyKm, 'emptyKm');
  requirePositive(input.fuelConsumption, 'fuelConsumption');
  requirePositive(input.fuelPrice, 'fuelPrice');
  requireFiniteNonNegative(input.tollCost, 'tollCost');
  requirePositive(input.operationalHours, 'operationalHours');
  requireFiniteNonNegative(input.driverHourlyCost, 'driverHourlyCost');
  requireFiniteNonNegative(input.wearPerKm, 'wearPerKm');
  requireFiniteNonNegative(input.fixedPerKm, 'fixedPerKm');

  const totalKm = input.loadedKm + input.emptyKm;
  const fuelCost = (totalKm / 100) * input.fuelConsumption * input.fuelPrice;
  const driverCost = input.operationalHours * input.driverHourlyCost;
  const wearCost = totalKm * input.wearPerKm;
  const fixedCost = totalKm * input.fixedPerKm;
  const totalOperationalCost = fuelCost + input.tollCost + driverCost + wearCost + fixedCost;

  return {
    totalKm,
    fuelCost,
    tollCost: input.tollCost,
    driverCost,
    wearCost,
    fixedCost,
    totalOperationalCost,
    costPerTravelledKm: totalOperationalCost / totalKm,
    costPerLoadedKm: totalOperationalCost / input.loadedKm,
  };
}

export function calculateFuelTrip(input) {
  requirePositive(input.distanceKm, 'distanceKm');
  requirePositive(input.fuelConsumption, 'fuelConsumption');
  requirePositive(input.fuelPrice, 'fuelPrice');
  requireFiniteNonNegative(input.emptyReturnKm, 'emptyReturnKm');

  const outboundLitres = (input.distanceKm / 100) * input.fuelConsumption;
  const returnLitres = (input.emptyReturnKm / 100) * input.fuelConsumption;
  const totalDistanceKm = input.distanceKm + input.emptyReturnKm;
  const totalLitres = outboundLitres + returnLitres;
  const outboundFuelCost = outboundLitres * input.fuelPrice;
  const returnFuelCost = returnLitres * input.fuelPrice;

  return {
    outboundDistanceKm: input.distanceKm,
    returnDistanceKm: input.emptyReturnKm,
    totalDistanceKm,
    outboundLitres,
    returnLitres,
    totalLitres,
    outboundFuelCost,
    returnFuelCost,
    totalFuelCost: outboundFuelCost + returnFuelCost,
  };
}
