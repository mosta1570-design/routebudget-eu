import assert from 'node:assert/strict';

import {
  calculateCostPerKm,
  calculateFuelTrip,
} from '../public/seo/calculators-core.js';

const tolerance = 1e-9;

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

console.log('Calculator fixtures passed.');

function approximately(actual, expected) {
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} differs from ${expected}`);
}
