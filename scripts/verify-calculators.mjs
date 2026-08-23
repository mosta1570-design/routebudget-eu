import assert from 'node:assert/strict';

import {
  calculateCostPerKm,
  calculateDrivingTime,
  calculateElectricVanChargeCost,
  calculateFuelSurcharge,
  calculateFuelTrip,
  calculateMinimumPriceMargin,
  parseItalianNumber,
} from '../public/seo/calculators-core.js';

const tolerance = 1e-9;

assert.equal(parseItalianNumber('1.000'), 1_000, 'Italian thousands separator must not become a decimal');
assert.equal(parseItalianNumber('1.000,50'), 1_000.5, 'Italian grouped decimal must parse correctly');
assert.equal(parseItalianNumber('1,75'), 1.75, 'Italian decimal comma must parse correctly');
assert.equal(parseItalianNumber('1.75'), 1.75, 'decimal point must remain accepted');
assert.ok(
  Number.isNaN(parseItalianNumber('4.500', { rejectAmbiguousGrouping: true })),
  'ambiguous three-digit decimal must be rejected for decimal fields',
);
assert.equal(
  parseItalianNumber('1.000,50', { rejectAmbiguousGrouping: true }),
  1_000.5,
  'explicit Italian grouped decimals must remain accepted',
);
assert.equal(parseItalianNumber('1 000,50'), 1_000.5, 'spaces used for grouping must be ignored');
assert.equal(parseItalianNumber('1\u00a0000,50'), 1_000.5, 'non-breaking spaces used for grouping must be ignored');
assert.ok(Number.isNaN(parseItalianNumber('1,000.50')), 'mixed English grouping must be rejected as ambiguous');
assert.ok(Number.isNaN(parseItalianNumber('1.000.50')), 'malformed grouping must be rejected');

const perKmInput = {
  loadedKm: 500,
  emptyKm: 100,
  fuelConsumption: 31,
  fuelPrice: 1.75,
  tollCost: 120,
  operationalHours: 9,
  driverHourlyCost: 25,
  wearPerKm: 0.18,
  fixedPerKm: 0.2,
};

const perKm = calculateCostPerKm(perKmInput);

approximately(perKm.totalKm, 600);
approximately(perKm.fuelCost, 325.5);
approximately(perKm.driverCost, 225);
approximately(perKm.wearCost, 108);
approximately(perKm.fixedCost, 120);
approximately(perKm.totalOperationalCost, 898.5);
approximately(perKm.costPerTravelledKm, 1.4975);
approximately(perKm.costPerLoadedKm, 1.797);

const fuelTrip = calculateFuelTrip({
  distanceKm: 640,
  fuelConsumption: 32,
  fuelPrice: 1.75,
  emptyReturnKm: 120,
});

approximately(fuelTrip.totalDistanceKm, 760);
approximately(fuelTrip.outboundLitres, 204.8);
approximately(fuelTrip.returnLitres, 38.4);
approximately(fuelTrip.totalLitres, 243.2);
approximately(fuelTrip.outboundFuelCost, 358.4);
approximately(fuelTrip.returnFuelCost, 67.2);
approximately(fuelTrip.totalFuelCost, 425.6);

const fuelSurcharge = calculateFuelSurcharge({
  baseFreight: 1_200,
  baseFuelPrice: 1.6,
  currentFuelPrice: 1.76,
  fuelSharePercent: 30,
});

approximately(fuelSurcharge.fuelPriceVariationPercent, 10);
approximately(fuelSurcharge.freightAdjustmentPercent, 3);
approximately(fuelSurcharge.adjustmentAmount, 36);
approximately(fuelSurcharge.adjustedFreight, 1_236);

const unchangedFuelSurcharge = calculateFuelSurcharge({
  baseFreight: 1_200,
  baseFuelPrice: 1.6,
  currentFuelPrice: 1.6,
  fuelSharePercent: 30,
});

approximately(unchangedFuelSurcharge.adjustmentAmount, 0);
approximately(unchangedFuelSurcharge.adjustedFreight, 1_200);

const decreasingFuelSurcharge = calculateFuelSurcharge({
  baseFreight: 1_200,
  baseFuelPrice: 1.6,
  currentFuelPrice: 1.52,
  fuelSharePercent: 25,
});

approximately(decreasingFuelSurcharge.fuelPriceVariationPercent, -5);
approximately(decreasingFuelSurcharge.freightAdjustmentPercent, -1.25);
approximately(decreasingFuelSurcharge.adjustmentAmount, -15);
approximately(decreasingFuelSurcharge.adjustedFreight, 1_185);

const fullIncidenceFuelSurcharge = calculateFuelSurcharge({
  baseFreight: 1_000,
  baseFuelPrice: 1,
  currentFuelPrice: 1.1,
  fuelSharePercent: 100,
});

approximately(fullIncidenceFuelSurcharge.freightAdjustmentPercent, 10);
approximately(fullIncidenceFuelSurcharge.adjustedFreight, 1_100);

assert.throws(
  () => calculateCostPerKm({ ...perKmInput, loadedKm: 0 }),
  /loadedKm/,
  'zero loaded kilometres must be rejected',
);

assert.throws(
  () => calculateFuelTrip({ distanceKm: -1, fuelConsumption: 30, fuelPrice: 1.7, emptyReturnKm: 0 }),
  /distanceKm/,
  'negative distance must be rejected',
);

assert.throws(
  () => calculateFuelSurcharge({ baseFreight: 1_000, baseFuelPrice: 0, currentFuelPrice: 1.7, fuelSharePercent: 30 }),
  /baseFuelPrice/,
  'zero base fuel price must be rejected',
);

assert.throws(
  () => calculateFuelSurcharge({ baseFreight: 1_000, baseFuelPrice: 1.6, currentFuelPrice: 1.7, fuelSharePercent: 101 }),
  /fuelSharePercent/,
  'fuel share above 100 percent must be rejected',
);

assert.throws(
  () => calculateFuelSurcharge({ baseFreight: 1_000, baseFuelPrice: Number.MIN_VALUE, currentFuelPrice: 1.7, fuelSharePercent: 30 }),
  /at least 0\.01/,
  'sub-cent base fuel price must be rejected before derived values overflow',
);

const drivingTime = calculateDrivingTime({
  drivingHours: 9,
  otherOperationalHours: 1.5,
  driverHourlyCost: 26,
});

approximately(drivingTime.breakCount, 1);
approximately(drivingTime.estimatedBreakHours, 0.75);
approximately(drivingTime.totalOperationalHours, 11.25);
approximately(drivingTime.driverCost, 292.5);
assert.equal(drivingTime.regularDailyLimitExceeded, false);
assert.equal(drivingTime.extendedDailyLimitExceeded, false);

const continuedDrivingTime = calculateDrivingTime({
  drivingHours: 9.1,
  otherOperationalHours: 0,
  driverHourlyCost: 0,
});
approximately(continuedDrivingTime.breakCount, 2);
approximately(continuedDrivingTime.estimatedBreakHours, 1.5);
assert.equal(continuedDrivingTime.regularDailyLimitExceeded, true);
assert.equal(continuedDrivingTime.extendedDailyLimitExceeded, false);

const exactFirstBlock = calculateDrivingTime({
  drivingHours: 4.5,
  otherOperationalHours: 0,
  driverHourlyCost: 26,
});
approximately(exactFirstBlock.breakCount, 0);
approximately(exactFirstBlock.estimatedBreakHours, 0);
approximately(exactFirstBlock.totalOperationalHours, 4.5);

const exactSecondBlock = calculateDrivingTime({
  drivingHours: 9,
  otherOperationalHours: 0,
  driverHourlyCost: 26,
});
approximately(exactSecondBlock.breakCount, 1);
approximately(exactSecondBlock.estimatedBreakHours, 0.75);
approximately(exactSecondBlock.totalOperationalHours, 9.75);

const minimumPrice = calculateMinimumPriceMargin({
  operationalCost: 1_000,
  targetMarginPercent: 20,
});
approximately(minimumPrice.breakEvenPrice, 1_000);
approximately(minimumPrice.targetPrice, 1_250);
approximately(minimumPrice.targetProfit, 250);
approximately(minimumPrice.effectiveMarkupPercent, 25);

assert.throws(
  () => calculateMinimumPriceMargin({ operationalCost: 1_000, targetMarginPercent: 100 }),
  /targetMarginPercent/,
  'a 100 percent margin would create an infinite price',
);

const electricVanCharge = calculateElectricVanChargeCost({
  batteryCapacityKWh: 80,
  initialSocPercent: 20,
  finalSocPercent: 80,
  chargingLossPercent: 10,
  energyPricePerKWh: 0.35,
  averageGridPowerKw: 11,
});
approximately(electricVanCharge.socAddedPercent, 60);
approximately(electricVanCharge.storedEnergyKWh, 48);
approximately(electricVanCharge.gridEnergyKWh, 53.3333333333);
approximately(electricVanCharge.energyLossKWh, 5.3333333333);
approximately(electricVanCharge.chargeCost, 18.6666666667);
approximately(electricVanCharge.theoreticalMinutes, 290.9090909091);

assert.throws(
  () => calculateElectricVanChargeCost({ ...electricVanCharge, batteryCapacityKWh: 80, initialSocPercent: 80, finalSocPercent: 20, chargingLossPercent: 10, energyPricePerKWh: 0.35, averageGridPowerKw: 11 }),
  /final state of charge/,
  'final state of charge must exceed initial state of charge',
);

assert.throws(
  () => calculateElectricVanChargeCost({ batteryCapacityKWh: 80, initialSocPercent: 20, finalSocPercent: 80, chargingLossPercent: 100, energyPricePerKWh: 0.35, averageGridPowerKw: 11 }),
  /charging loss/,
  '100 percent charging loss would create an infinite energy result',
);

console.log('Calculator fixtures passed.');

function approximately(actual, expected) {
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} differs from ${expected}`);
}
