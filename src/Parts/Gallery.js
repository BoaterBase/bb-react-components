import React, { useState } from 'react';
import { Image, Video, Placeholder, Transformation } from 'cloudinary-react';
import { useModal } from '../Modal';
import CloseIcon from '../icons/Close';
import ChevronLeft from '../icons/ChevronLeft';
import ChevronRight from '../icons/ChevronRight';

function Slideshow({ media = [], close, selected }) {
  const [current, setCurrent] = useState(selected);

  const prev = () => {
    setCurrent((c) => Math.max(0, c - 1));
  };
  const next = () => {
    setCurrent((c) => Math.min(media.length - 1, c + 1));
  };

  return (
    <div className="bb-fixed bb-inset-0 bb-bg-black bb-bg-opacity-75">
      <div className="bb-text-white bb-font-medium bb-text-base bb-fixed bb-top-2 bb-left-10 bb-right-10 bb-text-center bb-truncate">
        {media[current].description}
      </div>
      <div key={current} className="bb-fixed bb-top-10 bb-left-1 bb-right-1 bb-bottom-20 bb-flex bb-items-center bb-justify-center">
        {media[current].type == 'image' && (
          <Image
            className="bb-rounded-md bb-max-w-full bb-max-h-full bb-bg-gray-900 bb-object-scale-down"
            publicId={media[current].id}
            dpr="auto"
            responsive
            width="auto"
            responsiveUseBreakpoints="true"
          >
            <Transformation quality="auto" fetchFormat="auto" />
            <Placeholder type="blur" />
          </Image>
        )}
        {media[current].type == 'video' && (
          <Video
            controls
            playsInline
            autoPlay
            poster={{ transformation: 'large_image' }}
            sourceTypes={['mp4']}
            // TODO - we need own video tag to support streaming_video file
            // m3u8 -> application/x-mpegURL
            sourceTransformation={{
              mp4: { transformation: 'progressive_video' },
            }}
            className="bb-rounded-sm bb-h-full bb-bg-gray-900 bb-object-cover"
            publicId={media[current].id}
          ></Video>
        )}
      </div>
      <div className="bb-absolute bb-bottom-1 bb-flex bb-justify-center bb-left-0 bb-right-0 bb-overflow-y-hidden bb-overflow-x-auto">
        <div className="bb-flex bb-flex-no-wrap">
          {media.map((item, index) => (
            <button
              key={index}
              className="bb-block bb-rounded-sm bb-m-1 bb-flex-none bb-shadow focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue"
              onClick={() => setCurrent(index)}
            >
              <Image className="bb-rounded-sm bb-h-16 bb-bg-gray-900" publicId={item.id} transformation="small_image" resourceType={item.type} format="jpg">
                <Placeholder type="blur" />
              </Image>
            </button>
          ))}
          <b className="bb-w-1 bb-flex-none"></b>
        </div>
      </div>
      {current > 0 && (
        <button
          className="bb-absolute bb-top-1/2 bb-transform bb--translate-y-7 bb-left-1 bb-rounded-full bb-p-1 bb-bg-transparent focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue"
          onClick={prev}
        >
          <ChevronLeft className="bb-text-white bb-w-6 bb-h-6" />
        </button>
      )}
      {current < media.length - 1 && (
        <button
          className="bb-absolute bb-top-1/2 bb-transform bb--translate-y-7 bb-right-1 bb-rounded-full bb-p-1 bb-bg-transparent focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue"
          onClick={next}
        >
          <ChevronRight className="bb-text-white bb-w-6 bb-h-6" />
        </button>
      )}
      <button
        className="bb-absolute bb-top-1 bb-right-1 bb-rounded-full bb-p-1 bb-bg-transparent focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue"
        onClick={close}
      >
        <CloseIcon className="bb-text-white bb-w-6 bb-h-6" />
      </button>
    </div>
  );
}

function Gallery({ media = [], layout, limit = 9, lightbox = false, selected = 0 }) {
  const [current, setCurrent] = useState(selected);

  const setModal = useModal();

  const openModal = (selected) => (ev) => {
    ev && ev.preventDefault();

    setModal(<Slideshow media={media} close={() => setModal(null)} selected={selected} />);
  };

  switch (layout) {
    case 'primary':
      return (
        <div className="bb-relative bb-rounded-md bb-shadow">
          <svg viewBox="0 0 16 9" className="bb-block bb-w-full bb-invisible"></svg>
          <a href={media[current].original} target="_preview" onClick={openModal(current)}>
            <Image
              className="bb-rounded-md bb-absolute bb-w-full bb-h-full bb-bg-gray-400 bb-inset-0 bb-object-cover"
              publicId={media[current].id}
              dpr="auto"
              responsive
              width="auto"
              responsiveUseBreakpoints="true"
            >
              <Placeholder type="blur" />
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
          </a>
        </div>
      );
    case 'gallery':
      return (
        <ul className="bb-grid bb-grid-cols-3 bb-gap-1">
          {media.map((item, index) => (
            <li key={index} className="bb-relative bb-rounded-md bb-shadow">
              <svg viewBox="0 0 16 9" className="bb-block bb-w-full bb-invisible"></svg>
              <a href={item.original} target="_preview" onClick={openModal(index)}>
                <Image
                  className="bb-rounded-md bb-absolute bb-w-full bb-h-full bb-bg-gray-400 bb-inset-0 bb-object-cover"
                  publicId={item.id}
                  transformation="large_image"
                  resourceType={item.type}
                  format="jpg"
                  loading="lazy"
                >
                  <Placeholder type="blur" />
                </Image>
              </a>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <div>
          Stack
          {media.map((item) => (
            <div>{item.id}</div>
          ))}
        </div>
      );
  }
}

export default Gallery;
