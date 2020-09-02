import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

function MapBox({ latitude, longitude }) {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 8,
  });

  console.log(viewport);
  return (
    <div className="bb-relative bb-rounded-md bb-shadow">
      <svg viewBox="0 0 3 1" className="bb-block bb-w-full bb-invisible"></svg>
      <div className="bb-rounded-md bb-absolute bb-w-full bb-h-full bb-bg-blue-400 bb-inset-0 bb-object-cover">
        <ReactMapGL
          className="bb-rounded-md bb-overflow-hidden"
          mapboxApiAccessToken={'pk.eyJ1Ijoic2F5aXRyaWdodCIsImEiOiJjaXVmbjFsdzQwMGUyMnpud245ZjE4cmd3In0.lG2o6rH-9IRQY2eE2ktOiQ'}
          mapStyle="mapbox://styles/sayitright/ckcwaxgwl030u1iqb6b7m7b45"
          onViewStateChange={({ viewState }) => setViewport(viewState)}
          scrollZoom={false}
          {...viewport}
          width="100%"
          height="100%"
        >
          <Marker latitude={latitude} longitude={longitude} offsetLeft={0} offsetTop={0}>
            <svg className="bb-w-6 bb-h-6 bb-text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </Marker>
          <span class="bb-absolute bb-right-0 bb-m-2 bb-z-0 bb-inline-flex bb-shadow-sm bb-opacity-75">
            <button
              type="button"
              class="bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-1 bb-rounded-l-lg bb-border bb-border-gray-300 bb-bg-white bb-text-sm bb-leading-5 bb-font-bold bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150"
              aria-label="Zoom In"
              onClick={() => setViewport({ ...viewport, zoom: Math.min(17, Math.round(viewport.zoom) + 1) })}
            >
              +
            </button>
            <button
              type="button"
              class="bb--ml-px bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-1 bb-rounded-r-lg bb-border bb-border-gray-300 bb-bg-white bb-text-sm bb-leading-5 bb-font-bold bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150"
              aria-label="Zoom Out"
              onClick={() => setViewport({ ...viewport, zoom: Math.max(1, Math.round(viewport.zoom) - 1) })}
            >
              -
            </button>
          </span>
        </ReactMapGL>
      </div>
    </div>
  );
}

// {hits.filter((hit) => hit._geoloc?.lat && hit._geoloc?.lng).map(hit => <Marker key={hit.objectID} latitude={hit._geoloc.lat} longitude={hit._geoloc.lng} offsetLeft={0} offsetTop={0}>
//   <svg className="bb-w-5 bb-h-5 bb-text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
// </Marker>)}
export default MapBox;
