import React, { useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import MapImage from './MapImage';
import { useModal } from '../Modal';
import CloseIcon from '../icons/Close';

const mapboxApiAccessToken = 'pk.eyJ1Ijoic2F5aXRyaWdodCIsImEiOiJjaXVmbjFsdzQwMGUyMnpud245ZjE4cmd3In0.lG2o6rH-9IRQY2eE2ktOiQ';
const mapStyle = 'sayitright/ckcwaxgwl030u1iqb6b7m7b45'; //mapbox/streets-v11

mapboxgl.accessToken = mapboxApiAccessToken;

export default function MapBox({ latitude, longitude, zoom = 10, style, ...props }) {
  const setModal = useModal();

  const mapRef = useCallback((node) => {
    if (!node) return;

    const map = new mapboxgl.Map({
      container: node,
      style: 'mapbox://styles/' + mapStyle,
      center: [longitude, latitude],
      zoom: zoom,
    });

    var marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');
  }, []);

  return (
    <div className="bb-bg-white bb-shadow-2xl bb-rounded-lg bb-p-4 bb-fixed bb-inset-2">
      <div className="bb-relative bb-w-full bb-h-full bb-rounded-md bb-overflow-hidden">
        <MapImage
          className="bb-absolute bb-top-0 bb-left-0 bb-w-full bb-h-full bb-rounded-md bb-overflow-hidden bb-object-cover"
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          width={1280}
          height={900}
        />
        <div
          ref={mapRef}
          className="bb-absolute bb-top-0 bb-left-0 bb-w-full bb-h-full bb-rounded-md focus:bb-outline-none bb-outline-none bb-overflow-hidden"
        ></div>
      </div>
      <button
        className="bb-absolute bb-top-1 bb-right-1 bb-bg-red-500 bb-rounded-full bb-p-1 bb-bg-transparent focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue"
        onClick={() => setModal(null)}
      >
        <CloseIcon className="bb-text-white bb-w-6 bb-h-6" />
      </button>
    </div>
  );
}
