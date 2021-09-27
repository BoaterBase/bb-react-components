const converters = {
  length: {
    m: {
      base: 1.0,
      name: 'Meters',
      alt: 'ft',
    },
    ft: {
      base: 1 / 3.28084,
      name: 'Feet',
      alt: 'm',
    },
  },
  mass: {
    kg: {
      base: 1.0,
      name: 'Kilograms',
      alt: 'lb',
    },
    t: {
      base: 907.18474,
      name: 'Tons',
      alt: 'kg',
    },
    lb: {
      base: 0.45359237,
      name: 'Pounds',
      alt: 'kg',
    },
  },
  power: {
    kw: {
      base: 1.0,
      name: 'Kilowatts',
      alt: 'hp',
    },
    hp: {
      base: 0.7457,
      name: 'Horsepower',
      alt: 'kw',
    },
  },
  volume: {
    l: {
      base: 1.0,
      name: 'Litres',
      alt: 'gal',
    },
    gal: {
      base: 3.78541,
      name: 'Gallons',
      alt: 'l',
    },
  },
};

export function converter(measurement, from, to, value) {
  let cTo = !!to ? to : converters[measurement][from].alt;

  return (value * converters[measurement][from].base) / converters[measurement][cTo].base;
}

export function converterName(measurement, unit) {
  return converters[measurement][unit].name;
}

export function converterAltUnit(measurement, unit) {
  return converters[measurement][unit].alt;
}

// Handle user input export function convertMeasurement(measurement: string, from: string, to: string, fixed = -1) {
export function convertMeasurement(measurement, from, to, fixed = -1) {
  return (value) => {
    let v = parseFloat(value);
    if (value === undefined || value === '' || value === null) return null;
    else if (v === NaN) return null;
    else if (fixed >= 0) return Math.round(converter(measurement, from, to, value) * Math.pow(10, fixed)) / Math.pow(10, fixed);
    else return converter(measurement, from, to, value);
  };
}
