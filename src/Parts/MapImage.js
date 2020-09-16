import React from 'react';

const mapboxApiAccessToken = 'pk.eyJ1Ijoic2F5aXRyaWdodCIsImEiOiJjaXVmbjFsdzQwMGUyMnpud245ZjE4cmd3In0.lG2o6rH-9IRQY2eE2ktOiQ';
const mapStyle = 'sayitright/ckcwaxgwl030u1iqb6b7m7b45'; //mapbox/streets-v11

export default function MapImage({ latitude, longitude, zoom = 10, width = 300, height = 300, ...props }) {
  return (
    <img
      {...props}
      src={`https://api.mapbox.com/styles/v1/${mapStyle}/static/pin-l-harbor+07f(${longitude},${latitude})/${longitude},${latitude},${zoom},0,0/${width}x${height}@2x?logo=false&access_token=${mapboxApiAccessToken}`}
    />
  );
}
