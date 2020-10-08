import React from 'react';
import { memo } from 'react';
import { useSearch } from '../Search';
import { useCurrency } from '../Currency';
import { useBoaterBase } from '../BoaterBase';
import formatCurrency from '../utils/formatCurrency';

import HitCard from './HitCard';
import HitGallery from './HitGallery';
import HitList from './HitList';
export default memo(function Hit({ data }) {
  const [searchState] = useSearch();
  const { currency, rates, getRate } = useCurrency();
  const { theme } = useBoaterBase();

  // Get the price the user entered by default data.price is indexed usd conversion.
  let displayPrice = data.displayPrice;
  let displayCurrency = data.currency;
  if (displayPrice && displayCurrency && rates && currency != displayCurrency && getRate(displayCurrency) && getRate(currency)) {
    // To USD
    displayPrice = displayPrice / getRate(displayCurrency);
    // To selected currency
    displayPrice = displayPrice * getRate(currency);

    displayCurrency = currency;
  }

  const location = [data.business?.name?.split('::')[0], data.location].filter(Boolean);

  const specifications = [data.specifications.manufacturer, data.specifications.model, data.specifications.classification, data.specifications.category].filter(
    Boolean
  );

  const props = {
    slug: data.slug,
    title: theme.hitTitle(data),
    summary: data.summary,
    images: data.images || [],
    message: data.message,
    avatar: data.profile?.avatar,
    name: data.profile?.name.split('::')[0],
    handle: data.profile?.name.split('::')[1] || data.profile?.id,
    logo: data.business?.logo,
    businessName: data.business?.name.split('::')[0],
    businessHandle: data.business?.name.split('::')[1] || data.business?.id,
    availability: data.availability || [],
    label: data.label,
    price: displayPrice ? formatCurrency(displayPrice, displayCurrency) : 'POA',
    location: location.length ? location.join(' · ') : 'Location Not Set',
    specifications: specifications.length ? specifications.join(' · ') : 'Contact for Specifications',
  };

  switch (searchState.layout) {
    case 'card':
      return <HitCard {...props} />;
    case 'gallery':
      return <HitGallery {...props} />;
    case 'list':
      return <HitList {...props} />;
    default:
      return <code>{JSON.stringify(data)}</code>;
  }
});
