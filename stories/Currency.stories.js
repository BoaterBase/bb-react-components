import React from 'react';

import Currency, { useCurrency } from '../src/Currency';

export default {
  title: 'Components/Currency',
  component: Currency,
  argTypes: {},
};

const Rates = () => {
  const { rates, currency, setCurrency } = useCurrency();
  return (
    <div>
      <h2>Currency: {currency}</h2>
      <select value={currency} onChange={(ev) => setCurrency(ev.target.value)}>
        {currency ? <option>Default</option> : <option>Change Currency...</option>}
        {rates &&
          rates.map(({ symbol, rate, code }) => (
            <option key={code}>
              {symbol}
              {code}
            </option>
          ))}
      </select>
      <h2>Rates:</h2>
      <ul>
        {rates &&
          rates.map(({ symbol, rate, code }) => (
            <li key={code}>
              {symbol}
              {code}
              {rate}
            </li>
          ))}
      </ul>
    </div>
  );
};

const Template = (args) => (
  <Currency {...args}>
    <Rates />
  </Currency>
);

export const Provider = Template.bind({});
Provider.args = {};
