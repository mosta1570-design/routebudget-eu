import { calculateCostPerKm, calculateFuelTrip } from './calculators-core.js';

const eur = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const decimal = new Intl.NumberFormat('it-IT', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const kilometre = new Intl.NumberFormat('it-IT', {
  maximumFractionDigits: 1,
});

const LIMITS = {
  loadedKm: 100_000,
  emptyKm: 100_000,
  fuelConsumption: 500,
  fuelPrice: 100,
  tollCost: 1_000_000,
  operationalHours: 10_000,
  driverHourlyCost: 1_000,
  wearPerKm: 100,
  fixedPerKm: 100,
  distanceKm: 100_000,
  emptyReturnKm: 100_000,
};

for (const form of document.querySelectorAll('[data-calculator]')) {
  let started = false;
  let announcementFrame = null;

  form.addEventListener('input', () => {
    if (!started) {
      started = true;
      emit('calculator_start', { calculator_id: form.dataset.calculator });
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const error = form.querySelector('.calculator-error');
    const output = form.querySelector('.calculator-result');
    const status = form.querySelector('.calculator-status');

    if (announcementFrame !== null) {
      cancelAnimationFrame(announcementFrame);
      announcementFrame = null;
    }
    if (status) status.textContent = '';

    try {
      const result = form.dataset.calculator === 'cost-per-km'
        ? calculateCostPerKm(readCostPerKmInput(form))
        : calculateFuelTrip(readFuelTripInput(form));

      error.hidden = true;
      error.textContent = '';
      populateResult(form, result);
      output.hidden = false;
      announcementFrame = requestAnimationFrame(() => {
        if (status) status.textContent = resultAnnouncement(form.dataset.calculator, result);
        announcementFrame = null;
      });
      emit('calculator_complete', { calculator_id: form.dataset.calculator });
    } catch (calculationError) {
      output.hidden = true;
      error.textContent = calculationError instanceof Error
        ? calculationError.message
        : 'Controlla i valori inseriti.';
      error.hidden = false;
      error.focus();
      emit('calculator_validation_error', {
        calculator_id: form.dataset.calculator,
        error_code: calculationError?.code || 'invalid_value',
      });
    }
  });

  form.addEventListener('reset', () => {
    if (announcementFrame !== null) cancelAnimationFrame(announcementFrame);
    announcementFrame = null;
    started = false;
    form.querySelector('.calculator-error').hidden = true;
    form.querySelector('.calculator-error').textContent = '';
    form.querySelector('.calculator-result').hidden = true;
    form.querySelector('.calculator-status').textContent = '';
  });
}

function resultAnnouncement(calculator, result) {
  const isCostPerKm = calculator === 'cost-per-km';
  const label = isCostPerKm ? 'Costo operativo stimato' : 'Costo carburante stimato';
  const value = isCostPerKm ? result.totalOperationalCost : result.totalFuelCost;
  return `Calcolo completato. ${label}: ${eur.format(value)}.`;
}

function readCostPerKmInput(form) {
  return {
    loadedKm: readNumber(form, 'loadedKm', true, true),
    emptyKm: readNumber(form, 'emptyKm', false, false),
    fuelConsumption: readNumber(form, 'fuelConsumption', true, true),
    fuelPrice: readNumber(form, 'fuelPrice', true, true),
    tollCost: readNumber(form, 'tollCost', false, false),
    operationalHours: readNumber(form, 'operationalHours', true, true),
    driverHourlyCost: readNumber(form, 'driverHourlyCost', false, false),
    wearPerKm: readNumber(form, 'wearPerKm', false, false),
    fixedPerKm: readNumber(form, 'fixedPerKm', false, false),
  };
}

function readFuelTripInput(form) {
  return {
    distanceKm: readNumber(form, 'distanceKm', true, true),
    fuelConsumption: readNumber(form, 'fuelConsumption', true, true),
    fuelPrice: readNumber(form, 'fuelPrice', true, true),
    emptyReturnKm: readNumber(form, 'emptyReturnKm', false, false),
  };
}

function readNumber(form, name, required, strictlyPositive) {
  const input = form.elements.namedItem(name);
  const label = input?.closest('label')?.querySelector(':scope > span')?.textContent?.replaceAll('*', '').trim() || name;
  const raw = input?.value?.trim() || '';

  if (!raw) {
    if (required) {
      throw validationError(`Inserisci un valore per “${label}”.`, 'required');
    }
    return 0;
  }

  const normalized = raw.replace(/\s+/g, '').replace(',', '.');
  if (!/^\d+(?:\.\d+)?$/.test(normalized)) {
    throw validationError(`“${label}” deve essere un numero positivo. Usa la virgola per i decimali e nessun separatore delle migliaia.`, 'invalid_format');
  }

  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 0 || (strictlyPositive && value === 0)) {
    throw validationError(`Controlla il valore di “${label}”.`, 'invalid_value');
  }

  if (value > LIMITS[name]) {
    throw validationError(`“${label}” supera il limite previsto da questo calcolatore.`, 'out_of_range');
  }

  return value;
}

function populateResult(form, result) {
  for (const [key, value] of Object.entries(result)) {
    const target = form.querySelector(`[data-result="${key}"]`);
    if (!target) continue;

    if (key.endsWith('PerKm')) {
      target.textContent = `${eur.format(value)} / km`;
    } else if (key.toLowerCase().includes('cost')) {
      target.textContent = eur.format(value);
    } else if (key.toLowerCase().includes('litres')) {
      target.textContent = `${decimal.format(value)} L`;
    } else if (key.toLowerCase().includes('km')) {
      target.textContent = `${kilometre.format(value)} km`;
    }
  }
}

function emit(event, detail) {
  window.RouteBudgetAnalytics?.emit(event, detail);
}

function validationError(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}
