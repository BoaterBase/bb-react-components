import React from 'react';
import { QRCode as QR } from 'react-qr-svg';
import { useBoaterBase } from '../BoaterBase';

function QRCode({ pathname, query }) {
  const { linker } = useBoaterBase();
  const permalink = linker.createPermalink({ pathname, query });

  return <QR bgColor="#FFFFFF" fgColor="#000000" level="M" style={{ width: '100%' }} value={permalink} />;
}
export default QRCode;
