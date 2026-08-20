import {
  calculateCostPerKm,
  calculateFuelSurcharge,
  calculateFuelTrip,
  parseItalianNumber,
} from './calculators-core.js';

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

const percentage = new Intl.NumberFormat('it-IT', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
  signDisplay: 'exceptZero',
});

const plainPercentage = new Intl.NumberFormat('it-IT', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

const signedEur = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: 'exceptZero',
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
  baseFreight: 10_000_000,
  baseFuelPrice: 100,
  currentFuelPrice: 100,
  fuelSharePercent: 100,
};

const MINIMUMS = {
  baseFreight: 0.01,
  baseFuelPrice: 0.01,
  currentFuelPrice: 0.01,
  fuelSharePercent: 0.01,
};

const DECIMAL_FIELDS = new Set([
  'fuelConsumption',
  'fuelPrice',
  'operationalHours',
  'driverHourlyCost',
  'wearPerKm',
  'fixedPerKm',
  'baseFuelPrice',
  'currentFuelPrice',
  'fuelSharePercent',
]);

for (const form of document.querySelectorAll('[data-calculator]')) {
  let started = false;
  let announcementFrame = null;

  form.addEventListener('input', (event) => {
    if (!started) {
      started = true;
      emit('calculator_start', { calculator_id: form.dataset.calculator });
    }

    const input = event.target instanceof HTMLInputElement ? event.target : null;
    if (input?.getAttribute('aria-invalid') === 'true') {
      input.removeAttribute('aria-invalid');
      const errorId = form.querySelector('.calculator-error')?.id;
      if (errorId) removeDescription(input, errorId);
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
    clearInvalidFields(form, error.id);

    try {
      const result = calculate(form);

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
      const invalidInput = typeof calculationError?.fieldName === 'string'
        ? form.elements.namedItem(calculationError.fieldName)
        : null;
      if (invalidInput instanceof HTMLInputElement) {
        invalidInput.setAttribute('aria-invalid', 'true');
        addDescription(invalidInput, error.id);
        invalidInput.focus();
      } else {
        error.focus();
      }
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
    clearInvalidFields(form, form.querySelector('.calculator-error').id);
  });
}

function addDescription(input, id) {
  const ids = new Set((input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
  ids.add(id);
  input.setAttribute('aria-describedby', [...ids].join(' '));
}

function removeDescription(input, id) {
  const ids = (input.getAttribute('aria-describedby') || '')
    .split(/\s+/)
    .filter((value) => value && value !== id);
  if (ids.length > 0) input.setAttribute('aria-describedby', ids.join(' '));
  else input.removeAttribute('aria-describedby');
}

function clearInvalidFields(form, errorId) {
  for (const input of form.querySelectorAll('input[aria-invalid="true"]')) {
    input.removeAttribute('aria-invalid');
    removeDescription(input, errorId);
  }
}

function resultAnnouncement(calculator, result) {
  if (calculator === 'fuel-surcharge') {
    return `Calcolo completato. Nolo aggiornato stimato: ${eur.format(result.adjustedFreight)}. Adeguamento: ${signedEur.format(result.adjustmentAmount)}.`;
  }
  const isCostPerKm = calculator === 'cost-per-km';
  const label = isCostPerKm ? 'Costo operativo stimato' : 'Costo carburante stimato';
  const value = isCostPerKm ? result.totalOperationalCost : result.totalFuelCost;
  return `Calcolo completato. ${label}: ${eur.format(value)}.`;
}

function calculate(form) {
  if (form.dataset.calculator === 'cost-per-km') {
    return calculateCostPerKm(readCostPerKmInput(form));
  }
  if (form.dataset.calculator === 'fuel-surcharge') {
    return calculateFuelSurcharge(readFuelSurchargeInput(form));
  }
  return calculateFuelTrip(readFuelTripInput(form));
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

function readFuelSurchargeInput(form) {
  return {
    baseFreight: readNumber(form, 'baseFreight', true, true),
    baseFuelPrice: readNumber(form, 'baseFuelPrice', true, true),
    currentFuelPrice: readNumber(form, 'currentFuelPrice', true, true),
    fuelSharePercent: readNumber(form, 'fuelSharePercent', true, true),
  };
}

function readNumber(form, name, required, strictlyPositive) {
  const input = form.elements.namedItem(name);
  const label = input?.closest('label')?.querySelector(':scope > span')?.textContent?.replaceAll('*', '').trim() || name;
  const raw = input?.value?.trim() || '';

  if (!raw) {
    if (required) {
      throw validationError(`Inserisci un valore per “${label}”.`, 'required', name);
    }
    return 0;
  }

  const value = parseItalianNumber(raw, {
    rejectAmbiguousGrouping: DECIMAL_FIELDS.has(name),
  });
  if (!Number.isFinite(value)) {
    throw validationError(`“${label}” deve essere un numero positivo. Usa la virgola per i decimali (es. 4,5) e il punto solo per le migliaia (es. 1.000).`, 'invalid_format', name);
  }

  if (value < 0 || (strictlyPositive && value === 0)) {
    throw validationError(`Controlla il valore di “${label}”.`, 'invalid_value', name);
  }

  if (value > LIMITS[name]) {
    throw validationError(`“${label}” supera il limite previsto da questo calcolatore.`, 'out_of_range', name);
  }

  if (MINIMUMS[name] !== undefined && value < MINIMUMS[name]) {
    throw validationError(`“${label}” deve essere almeno ${String(MINIMUMS[name]).replace('.', ',')}.`, 'out_of_range', name);
  }

  return value;
}

function populateResult(form, result) {
  for (const [key, value] of Object.entries(result)) {
    const target = form.querySelector(`[data-result="${key}"]`);
    if (!target) continue;

    if (key === 'fuelSharePercent') {
      target.textContent = `${plainPercentage.format(value)}%`;
    } else if (key.endsWith('Percent')) {
      target.textContent = `${percentage.format(value)}%`;
    } else if (key === 'adjustmentAmount') {
      target.textContent = signedEur.format(value);
    } else if (['baseFreight', 'adjustedFreight'].includes(key)) {
      target.textContent = eur.format(value);
    } else if (key.endsWith('PerKm')) {
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

function validationError(message, code, fieldName) {
  const error = new Error(message);
  error.code = code;
  error.fieldName = fieldName;
  return error;
}
