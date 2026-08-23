import {
  calculateCostPerKm,
  calculateDrivingTime,
  calculateElectricVanChargeCost,
  calculateFuelSurcharge,
  calculateFuelTrip,
  calculateMinimumPriceMargin,
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
  drivingHours: 24,
  otherOperationalHours: 24,
  operationalCost: 10_000_000,
  targetMarginPercent: 99.99,
  batteryCapacityKWh: 500,
  initialSocPercent: 100,
  finalSocPercent: 100,
  chargingLossPercent: 50,
  energyPricePerKWh: 10,
  averageGridPowerKw: 1_000,
};

const MINIMUMS = {
  baseFreight: 0.01,
  baseFuelPrice: 0.01,
  currentFuelPrice: 0.01,
  fuelSharePercent: 0.01,
  operationalCost: 0.01,
  targetMarginPercent: 0.01,
  batteryCapacityKWh: 0.01,
  finalSocPercent: 0.01,
  energyPricePerKWh: 0.01,
  averageGridPowerKw: 0.01,
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
  'drivingHours',
  'otherOperationalHours',
  'operationalCost',
  'targetMarginPercent',
  'batteryCapacityKWh',
  'initialSocPercent',
  'finalSocPercent',
  'chargingLossPercent',
  'energyPricePerKWh',
  'averageGridPowerKw',
]);

for (const form of document.querySelectorAll('[data-calculator]')) {
  let started = false;
  let completed = false;
  let announcementFrame = null;

  form.addEventListener('input', (event) => {
    if (!started) {
      started = true;
      emit('calculator_start', { calculator_id: form.dataset.calculator });
    }

    const input = event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement
      ? event.target
      : null;
    const error = form.querySelector('.calculator-error');
    const editsInvalidField = input?.getAttribute('aria-invalid') === 'true';
    const editsRelation = error?.dataset.errorCode === 'invalid_relation'
      && ['initialSocPercent', 'finalSocPercent'].includes(input?.name);

    if (editsInvalidField) {
      input.removeAttribute('aria-invalid');
      if (error?.id) removeDescription(input, error.id);
    }
    if (editsRelation && error?.id) clearInvalidFields(form, error.id);
    if ((editsInvalidField || editsRelation) && error) {
      error.hidden = true;
      error.textContent = '';
      delete error.dataset.errorCode;
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
      delete error.dataset.errorCode;
      populateResult(form, result);
      updateResultNotice(form, result);
      output.hidden = false;
      announcementFrame = requestAnimationFrame(() => {
        if (status) status.textContent = resultAnnouncement(form.dataset.calculator, result);
        announcementFrame = null;
      });
      if (!started) {
        started = true;
        emit('calculator_start', { calculator_id: form.dataset.calculator });
      }
      if (!completed) {
        completed = true;
        emit('calculator_complete', { calculator_id: form.dataset.calculator });
      }
    } catch (calculationError) {
      output.hidden = true;
      error.textContent = calculationError instanceof Error
        ? calculationError.message
        : 'Controlla i valori inseriti.';
      error.dataset.errorCode = calculationError?.code || 'invalid_value';
      error.hidden = false;
      const invalidInput = typeof calculationError?.fieldName === 'string'
        ? form.elements.namedItem(calculationError.fieldName)
        : null;
      if (invalidInput instanceof HTMLInputElement || invalidInput instanceof HTMLSelectElement) {
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
    completed = false;
    form.querySelector('.calculator-error').hidden = true;
    form.querySelector('.calculator-error').textContent = '';
    delete form.querySelector('.calculator-error').dataset.errorCode;
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
  for (const input of form.querySelectorAll('input[aria-invalid="true"], select[aria-invalid="true"]')) {
    input.removeAttribute('aria-invalid');
    removeDescription(input, errorId);
  }
}

function resultAnnouncement(calculator, result) {
  if (calculator === 'driving-time') {
    return `Calcolo completato. Tempo operativo totale: ${formatHours(result.totalOperationalHours)}. Pause stimate tra blocchi: ${formatHours(result.estimatedBreakHours)}.`;
  }
  if (calculator === 'minimum-price-margin') {
    return `Calcolo completato. Prezzo obiettivo stimato: ${eur.format(result.targetPrice)}.`;
  }
  if (calculator === 'electric-van-charge-cost') {
    return `Calcolo completato. Costo di ricarica stimato: ${eur.format(result.chargeCost)}. Energia prelevata dalla rete: ${decimal.format(result.gridEnergyKWh)} chilowattora.`;
  }
  if (calculator === 'fuel-surcharge') {
    return `Calcolo completato. Nolo aggiornato stimato: ${eur.format(result.adjustedFreight)}. Adeguamento: ${signedEur.format(result.adjustmentAmount)}.`;
  }
  const isCostPerKm = calculator === 'cost-per-km';
  const label = isCostPerKm ? 'Costo operativo stimato' : 'Costo carburante stimato';
  const value = isCostPerKm ? result.totalOperationalCost : result.totalFuelCost;
  return `Calcolo completato. ${label}: ${eur.format(value)}.`;
}

function calculate(form) {
  switch (form.dataset.calculator) {
    case 'cost-per-km':
      return calculateCostPerKm(readCostPerKmInput(form));
    case 'fuel-surcharge':
      return calculateFuelSurcharge(readFuelSurchargeInput(form));
    case 'fuel-trip':
      return calculateFuelTrip(readFuelTripInput(form));
    case 'driving-time':
      return calculateDrivingTime(readDrivingTimeInput(form));
    case 'minimum-price-margin':
      return calculateMinimumPriceMargin(readMinimumPriceMarginInput(form));
    case 'electric-van-charge-cost':
      return calculateElectricVanChargeCost(readElectricVanChargeInput(form));
    default:
      throw validationError('Calcolatore non supportato.', 'invalid_value');
  }
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

function readDrivingTimeInput(form) {
  return {
    drivingHours: readNumber(form, 'drivingHours', true, true),
    otherOperationalHours: readNumber(form, 'otherOperationalHours', false, false),
    driverHourlyCost: readNumber(form, 'driverHourlyCost', false, false),
  };
}

function readMinimumPriceMarginInput(form) {
  return {
    operationalCost: readNumber(form, 'operationalCost', true, true),
    targetMarginPercent: readNumber(form, 'targetMarginPercent', true, true),
  };
}

function readElectricVanChargeInput(form) {
  const input = {
    batteryCapacityKWh: readNumber(form, 'batteryCapacityKWh', true, true),
    initialSocPercent: readNumber(form, 'initialSocPercent', true, false),
    finalSocPercent: readNumber(form, 'finalSocPercent', true, true),
    chargingLossPercent: readNumber(form, 'chargingLossPercent', true, false),
    energyPricePerKWh: readNumber(form, 'energyPricePerKWh', true, true),
    averageGridPowerKw: readNumber(form, 'averageGridPowerKw', true, true),
  };

  if (input.finalSocPercent <= input.initialSocPercent) {
    throw validationError(
      '“Carica finale desiderata” deve essere superiore alla carica iniziale.',
      'invalid_relation',
      'finalSocPercent',
    );
  }

  return input;
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

    if (key.endsWith('KWh')) {
      target.textContent = `${decimal.format(value)} kWh`;
    } else if (key === 'theoreticalMinutes') {
      target.textContent = formatChargeDuration(value);
    } else if (key === 'socAddedPercent') {
      target.textContent = `${plainPercentage.format(value)}%`;
    } else if (key === 'breakCount') {
      target.textContent = String(value);
    } else if (key.endsWith('Hours')) {
      target.textContent = formatHours(value);
    } else if (['fuelSharePercent', 'targetMarginPercent'].includes(key)) {
      target.textContent = `${plainPercentage.format(value)}%`;
    } else if (key.endsWith('Percent')) {
      target.textContent = `${percentage.format(value)}%`;
    } else if (key === 'adjustmentAmount') {
      target.textContent = signedEur.format(value);
    } else if (['baseFreight', 'adjustedFreight', 'breakEvenPrice', 'targetPrice', 'targetProfit'].includes(key)) {
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

function updateResultNotice(form, result) {
  const notice = form.querySelector('[data-result-notice]');
  if (!notice) return;

  if (result.extendedDailyLimitExceeded) {
    notice.textContent = 'Attenzione: la guida inserita supera 10 ore. Non usare questa stima come autorizzazione a guidare: verifica subito cronologia, estensioni ammesse, riposi e registrazioni del tachigrafo.';
    notice.dataset.level = 'critical';
    notice.setAttribute('role', 'alert');
    notice.setAttribute('aria-live', 'assertive');
    notice.hidden = false;
  } else if (result.regularDailyLimitExceeded) {
    notice.textContent = 'La guida inserita supera 9 ore. L’estensione fino a 10 ore è soggetta a limiti e condizioni: verifica tachigrafo, cronologia del conducente e riposi prima di pianificare.';
    notice.dataset.level = 'warning';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    notice.hidden = false;
  } else {
    notice.textContent = '';
    notice.removeAttribute('data-level');
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    notice.hidden = true;
  }
}

function formatChargeDuration(totalMinutes) {
  const roundedMinutes = Math.round(totalMinutes);
  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${String(minutes).padStart(2, '0')} min`;
}

function formatHours(totalHours) {
  return formatChargeDuration(totalHours * 60);
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
