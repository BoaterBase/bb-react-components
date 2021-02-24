import React, { useState, useEffect } from 'react';
import { Image, Video, Placeholder, Transformation } from 'cloudinary-react';
import classNames from 'classnames';
import { useModal } from '../Modal';
import Slider from './Slider';
import Expand from '../icons/Expand';
import CloseIcon from '../icons/Close';
import ChevronLeft from '../icons/ChevronLeft';
import ChevronRight from '../icons/ChevronRight';
import RichText from './RichText';

function Slideshow({ media = [], close, selected }) {
  // Set current to selected id index
  const [current, setCurrent] = useState(
    Math.max(
      0,
      media.findIndex((item) => item.id === selected)
    )
  );
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
        <div className="bb-flex bb-flex-nowrap">
          {media.map((item, index) => (
            <button
              key={index}
              className="bb-block bb-rounded-sm bb-m-1 bb-flex-none bb-shadow focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue"
              onClick={() => setCurrent(index)}
            >
              <Image className="bb-rounded-sm bb-h-16 bb-bg-gray-900" publicId={item.id} transformation="small_image" resourceType={item.type} format="jpg">
                {item.type == 'image' && <Placeholder type="blur" />}
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

function Gallery({ media = [], layout, limit = 14, onReady }) {
  const current = 0;

  const setModal = useModal();

  const openModal = (selected) => (ev) => {
    ev && ev.preventDefault();
    setModal(<Slideshow media={media} close={() => setModal(null)} selected={selected} />);
  };

  useEffect(() => {
    onReady &&
      onReady({
        showSlideshow: (selected) => setModal(<Slideshow media={media} close={() => setModal(null)} selected={selected} />),
      });
  }, [onReady]);

  if (!media?.length) return null;

  switch (layout) {
    case 'primary':
      return (
        <div className="bb-relative bb-rounded-md bb-shadow">
          <svg viewBox="0 0 16 9" className="bb-block bb-w-full bb-invisible"></svg>
          <a href={media[current].original} target="_preview" onClick={openModal(media[current].id)}>
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

    case 'flex':
      return (
        <div class="bb-flex bb-flex-wrap bb-items-center bb-justify-center">
          {media.map((item, index) => (
            <a key={index} href={item.link} title={item.label}>
              <Image
                className={'bb-h-24 bb-m-2' + (item.link ? ' hover:bb-shadow-lg hover:bb-rounded-md' : '')}
                publicId={item.id}
                resourceType={item.type}
                dpr="auto"
                responsive
                width="auto"
                responsiveUseBreakpoints="true"
              >
                {item.type == 'image' && <Placeholder type="blur" />}
                <Transformation quality="auto" fetchFormat="auto" />
              </Image>
            </a>
          ))}
        </div>
      );

    case 'slider':
      return <Slider slides={media} aspect={16 / 9} delay={5} autoplay={false} />;
    case 'alternate':
      return (
        <div className="bb-divide-y bb-divide-gray-100">
          {media.map((item, index) => (
            <div key={index}>
              <div className="md:bb-flex bb-items-center">
                {item.description && (
                  <div className={'bb-p-3 bb-w-1/2 bb-flex-none ' + (index % 2 ? 'bb-order-first' : 'bb-order-last')}>
                    <div className="bb-prose">
                      <RichText text={item.description} />
                    </div>
                    {item.link && item.label && (
                      <a
                        href={item.link}
                        className="bb-inline-block bb-py-3 bb-px-5 bb-mt-4 bb-bg-blue-500 bb-rounded bb-no-underline bb-shadow-md bb-text-white bb-font-semibold"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                )}
                <a key={index} href={item.link} title={item.label} className="bb-w-auto bb-m-auto">
                  <Image
                    className="bb-w-full bb-my-6"
                    publicId={item.id}
                    resourceType={item.type}
                    dpr="auto"
                    responsive
                    width="auto"
                    responsiveUseBreakpoints="true"
                  >
                    {item.type == 'image' && <Placeholder type="blur" />}
                    <Transformation quality="auto" fetchFormat="auto" />
                  </Image>
                </a>
              </div>
              {!item.description && item.link && item.label && (
                <div className="bb-flex bb-justify-center">
                  <a
                    href={item.link}
                    className="bb-inline-block bb-py-3 bb-px-5 bb-mt-4 bb-bg-blue-500 bb-shadow-md bb-rounded bb-no-underline bb-text-white bb-font-semibold"
                  >
                    {item.label}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    default:
      // 'gallery'
      // Split into grids of 3,4 upto max of 4 rows
      const limited = media.slice(0, limit);
      const rows = [];

      // Push everything except the first row
      rows.push(limited.slice(3, 7));
      rows.push(limited.slice(7, 10));
      rows.push(limited.slice(10, 14));

      // Strip out single items so we don't get a trailing full width image
      const grids = rows.filter((row) => row.length > 1);

      // Add first row back even if its single entry to allow full width on single items
      grids.unshift(limited.slice(0, 3));

      // Count how many we are going to actually render
      const count = grids.reduce((acc, a) => acc + a.length, 0);

      const cols = ['bb-grid-cols-0', 'bb-grid-cols-1', 'bb-grid-cols-2', 'bb-grid-cols-3', 'bb-grid-cols-4'];

      // TODO - we cant use index for gallery it is not consistant so use id
      return (
        <div className="bb-space-y-0.5 bb-relative">
          {grids.map((items, index) => (
            <ul key={index} className={classNames('bb-grid bb-gap-0.5', cols[items.length])}>
              {items.map((item, index) => (
                <li
                  key={index}
                  className="bb-relative bb-rounded-sm bb-shadow-sm hover:bb-shadow-sm hover:bb-opacity-75 bb-transform hover:bb--translate-y-px hover:bb-z-10"
                >
                  {items.length < 4 && <svg viewBox="0 0 16 9" className="bb-block bb-w-full bb-invisible"></svg>}
                  {items.length > 3 && <svg viewBox="0 0 6 4" className="bb-block bb-w-full bb-invisible"></svg>}
                  <a href={item.original} target="_preview" onClick={openModal(item.id)}>
                    <Image
                      className="bb-rounded-sm bb-absolute bb-w-full bb-h-full bb-bg-gray-400 bb-inset-0 bb-object-cover"
                      publicId={item.id}
                      transformation="large_image"
                      resourceType={item.type}
                      format="jpg"
                      loading="lazy"
                    >
                      {item.type == 'image' && <Placeholder type="blur" />}
                    </Image>
                  </a>
                </li>
              ))}
            </ul>
          ))}

          <button
            onClick={openModal()}
            className="bb-absolute bb-z-10 bb-flex bb-items-center bb-bottom-1 bb-right-1 bb-shadow bb-px-1.5 bb-py-1 bb-rounded-md bb-bg-black bb-opacity-50 bb-appearance-none focus:bb-outline-none hover:bb-opacity-100"
          >
            {count < media.length && (
              <span className="bb-mr-0.5 bb-text-xs bb-font-medium bb-text-white">
                {count} of {media.length}
              </span>
            )}
            <Expand className="bb-w-3 bb-h-3 bb-text-white" />
          </button>
        </div>
      );
  }
}

export default Gallery;
