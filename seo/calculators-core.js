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

export function parseItalianNumber(rawValue, options = {}) {
  const raw = String(rawValue ?? '').trim().replace(/[\s\u00a0\u202f]+/g, '');
  if (!raw) return Number.NaN;

  const italianGrouped = /^\d{1,3}(?:\.\d{3})+(?:,\d+)?$/;
  if (italianGrouped.test(raw)) {
    const ambiguousSingleGroup = /^\d{1,3}\.\d{3}$/.test(raw);
    if (options.rejectAmbiguousGrouping && ambiguousSingleGroup) {
      return Number.NaN;
    }
    return Number(raw.replaceAll('.', '').replace(',', '.'));
  }

  if (/^\d+(?:,\d+)?$/.test(raw)) {
    return Number(raw.replace(',', '.'));
  }

  if (/^\d+\.\d+$/.test(raw)) {
    return Number(raw);
  }

  return Number.NaN;
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

export function calculateFuelSurcharge(input) {
  requirePositive(input.baseFreight, 'baseFreight');
  requirePositive(input.baseFuelPrice, 'baseFuelPrice');
  requirePositive(input.currentFuelPrice, 'currentFuelPrice');
  requirePositive(input.fuelSharePercent, 'fuelSharePercent');

  if (input.baseFreight < 0.01 || input.baseFuelPrice < 0.01 || input.currentFuelPrice < 0.01) {
    throw new RangeError('currency inputs must be at least 0.01');
  }
  if (input.fuelSharePercent > 100) {
    throw new RangeError('fuelSharePercent must not exceed 100');
  }

  const fuelPriceVariationRate = (input.currentFuelPrice - input.baseFuelPrice) / input.baseFuelPrice;
  const freightAdjustmentRate = fuelPriceVariationRate * (input.fuelSharePercent / 100);
  const adjustmentAmount = input.baseFreight * freightAdjustmentRate;
  const adjustedFreight = input.baseFreight + adjustmentAmount;

  if (![fuelPriceVariationRate, freightAdjustmentRate, adjustmentAmount, adjustedFreight].every(Number.isFinite)) {
    throw new RangeError('fuel surcharge result must be finite');
  }

  return {
    baseFreight: input.baseFreight,
    fuelSharePercent: input.fuelSharePercent,
    fuelPriceVariationPercent: fuelPriceVariationRate * 100,
    freightAdjustmentPercent: freightAdjustmentRate * 100,
    adjustmentAmount,
    adjustedFreight,
  };
}
