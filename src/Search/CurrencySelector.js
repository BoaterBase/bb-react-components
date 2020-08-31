import React, { memo } from 'react';
import { useCurrency } from '../Currency';
export default memo(function CurrencySelector() {
  const { rates, currency, setCurrency } = useCurrency();

  const onChange = (event) => setCurrency(event.target.value);

  if (rates) {
    return (
      <select
        onChange={onChange}
        value={currency}
        className="bb-cursor-pointer bb-flex-auto bb-form-select bb-block bb-pl-2 sm:bb-pl-3 bb-pr-10 bb-py-2 bb-text-gray-500 bb-text-base bb-leading-6 bb-border-gray-300 focus:bb-outline-none focus:bb-shadow-outline-blue focus:bb-border-blue-300 sm:bb-text-sm sm:bb-leading-5"
      >
        <option value="">{currency ? 'Default' : 'Currency'}</option>
        {rates.map(({ code, symbol }) => (
          <option key={code} value={code}>
            {symbol} {code}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <div
        title={rates === false ? 'Error loading currency exchange rates!' : 'Loading currency exchange rates...'}
        className="bb-cursor-wait bb-flex-auto md:bb-flex-initial bb-inline-flex bb-justify-between bb-items-center bb-px-2 sm:bb-px-3 bb-py-2 bb-rounded-md bb-border bb-border-gray-300 bb-bg-white bb-text-base sm:bb-text-sm bb-leading-6 sm:bb-leading-5 bb-font-normal bb-text-gray-500 "
      >
        Currency
        {rates === false ? (
          <svg
            className="bb-ml-2 bb-h-5 bb-w-5 bb-text-red-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="bb-ml-2 bb-animate-spin bb-h-5 bb-w-5 bb-text-gray-200" fill="none" viewBox="0 0 24 24">
            <circle className="bb-opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />{' '}
            <path
              className="bb-opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
      </div>
    );
  }
});
