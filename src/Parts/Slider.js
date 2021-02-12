import React, { useState, useEffect } from 'react';
import { Image, Video, Placeholder, Transformation } from 'cloudinary-react';
import Pause from '../icons/Pause';
import Play from '../icons/Play';
import Mute from '../icons/Mute';
import Unmute from '../icons/Unmute';
import RichText from './RichText';
export default function Slider({ slides, aspect = 2, delay = 5, autoplay = true }) {
  // Set current to selected id index
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const [muted, setMuted] = useState(true);

  const prev = () => {
    setCurrent((c) => Math.max(0, c - 1));
  };
  const next = () => {
    setCurrent((c) => Math.min(slides.length - 1, c + 1));
  };

  useEffect(() => {
    let intervalId = setTimeout(() => {
      if (playing) {
        setCurrent((c) => (c + 1) % slides.length);
      }
    }, (slides[current].duration || delay) * 1000);

    return () => clearInterval(intervalId);
    // Listening to current resets itself when timeout triggers!
  }, [delay, current]);

  const slide = slides[current];

  return (
    <div className="bb-relative bb-bg-gray-600">
      <svg
        viewBox={`0 0 ${aspect} 1`}
        style={{
          background: '#eee',
          display: 'block',
          width: '100%',
        }}
      ></svg>
      <div key={current} className="bb-absolute bb-top-0 bb-left-0 bb-w-full bb-h-full bb-animate-fade-in">
        {slide.type == 'image' && (
          <Image
            className="bb-w-full bb-h-full bb-object-cover bb-object-center"
            publicId={slide.id}
            dpr="auto"
            responsive
            width="auto"
            responsiveUseBreakpoints="true"
          >
            <Transformation quality="auto" fetchFormat="auto" />
            <Placeholder type="blur" />
          </Image>
        )}
        {slide.type == 'video' && (
          <Video
            playsInline
            autoPlay={playing}
            muted={muted}
            poster={{ transformation: 'large_image' }}
            sourceTypes={['mp4']}
            // TODO - we need own video tag to support streaming_video file
            // m3u8 -> application/x-mpegURL
            sourceTransformation={{
              mp4: { transformation: 'progressive_video' },
            }}
            className="bb-w-full bb-h-full bb-object-cover bb-object-center"
            publicId={slide.id}
          ></Video>
        )}
      </div>
      <div className="bb-absolute bb-top-0 bb-left-0 bb-w-full bb-h-full bb-flex bb-items-center bb-justify-center">
        <div className="bb-flex bb-flex-col bb-items-center bb-justify-center">
          {slide.description && (
            <div className="bb-text-white bb-opacity-80 bb-tracking-wide">
              <RichText text={slide.description} />
            </div>
          )}

          {slide.label && slide.link && (
            <a
              href={slide.link}
              className="bb-mt-4 bb-inline-block bb-rounded bb-px-4 bb-py-2 bb-bg-white bb-text-gray-700 bb-text-xl bb-font-semibold bb-opacity-80 hover:bb-opacity-95"
            >
              {slide.label}
            </a>
          )}
        </div>
        {!slide.label && slide.link && <a href={slide.link} className="bb-absolute bb-block bb-inset-0" />}
      </div>
      {slides.length > 1 && (
        <ul className="bb-absolute bb-bottom-0 bb-w-full bb-h-auto bb-flex bb-items-center">
          <li className="bb-w-full bb-flex bb-flex-auto">
            {slide.type == 'video' && (
              <button
                className="bb-mb-1 bb-ml-1 bb-mr-auto bb-text-white bb-opacity-80 hover:bb-opacity-60 bb-rounded-md bb-border-none pp-p-1"
                onClick={() => setMuted((v) => !v)}
              >
                {muted ? <Mute className="bb-w-8 bb-h-8" /> : <Unmute className="bb-w-8 bb-h-8" />}
              </button>
            )}
          </li>
          {slides.map((slide, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrent(index)}
                className={'bb-w-3 bb-h-3 bb-opacity-50 hover:bb-opacity-90 bb-rounded-full bb-m-0.5 ' + (current !== index ? 'bb-bg-black' : 'bb-bg-white')}
              ></button>
            </li>
          ))}
          <li className="bb-w-full bb-flex bb-flex-auto bb-justify-end">
            <button
              className="bb-ml-auto bb-mb-1 bb-mr-1 bb-text-white bb-opacity-80 hover:bb-opacity-60 bb-rounded-md bb-border-none pp-p-1"
              onClick={() => setPlaying((v) => !v)}
            >
              {playing ? <Pause className="bb-w-8 bb-h-8" /> : <Play className="bb-w-8 bb-h-8" />}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
