import React, { useState } from 'react';
import { Image, Placeholder, Transformation } from 'cloudinary-react';

function Gallery({ media = [], layout, limit = 9, lightbox = false, selected = 0 }) {
  const [current, setCurrent] = useState(selected);

  switch (layout) {
    case 'primary':
      return (
        <div className="bb-relative bb-rounded-md bb-shadow">
          <svg viewBox="0 0 16 9" className="bb-block bb-w-full bb-invisible"></svg>
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
        </div>
      );
    case 'gallery':
      return (
        <ul className="bb-grid bb-grid-cols-3 bb-gap-1">
          {media.map((item, index) => (
            <li key={index} className="bb-relative bb-rounded-md bb-shadow">
              <svg viewBox="0 0 16 9" className="bb-block bb-w-full bb-invisible"></svg>

              <Image
                className="bb-rounded-md bb-absolute bb-w-full bb-h-full bb-bg-gray-400 bb-inset-0 bb-object-cover"
                publicId={item.id}
                dpr="auto"
                responsive
                width="auto"
                responsiveUseBreakpoints="true"
              >
                <Placeholder type="blur" />
                <Transformation quality="auto" fetchFormat="auto" />
              </Image>
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
