import React from 'react';
import Markdown from 'markdown-to-jsx';

import Gallery from './Gallery';

const H2 = (props) => <h2 {...props} />;
const H3 = (props) => <h3 {...props} />;
const H4 = (props) => <h4 {...props} />;
const B = (props) => <b {...props} />;
const P = (props) => <p {...props} />;

function Content({ items, className }) {
  return items ? (
    <div className={className}>
      {items.map((item, index) => {
        switch (item.kind) {
          case 'heading':
            return (
              <h2
                key={index}
                className="bb-mt-3 bb-mb-4 bb-text-2xl bb-leading-8 bb-font-semibold bb-tracking-tight bb-text-gray-800 sm:bb-text-3xl sm:bb-leading-10"
              >
                {item.text}
              </h2>
            );
          case 'quote':
            return (
              <blockquote key={index} className="bb-block bb-text-center bb-mt-12">
                <p className="bb-text-gray-600 bb-text-xl bb-italic bb-font-semibold">“{item.text}”</p>
                {item.attribution && <span className="bb-text-gray-300 bb-font-light">— {item.attribution}</span>}
              </blockquote>
            );
          case 'text':
            return (
              <div key={index} className="bb-mt-4 bb-prose bb-max-w-none">
                <Markdown
                  options={{
                    forceBlock: true,
                    overrides: {
                      h1: H2,
                      h2: H3,
                      h3: H4,
                      h4: B,
                      h5: P,
                      h6: P,
                    },
                  }}
                >
                  {item.text}
                </Markdown>
              </div>
            );
          case 'media':
            return (
              <div key={index} className="bb-my-3">
                <Gallery media={item.items} layout="gallery" />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  ) : null;
}

export default Content;
