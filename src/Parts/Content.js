import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import Gallery from './Gallery';
import classNames from 'classnames';

const H2 = (props) => <h2 {...props} />;
const H3 = (props) => <h3 {...props} />;
const H4 = (props) => <h4 {...props} />;
const B = (props) => <b {...props} />;
const P = (props) => <p {...props} />;

function Content({ items, className, snippet }) {
  const length = items
    ? items.reduce((ret, item) => {
        if (item.text) {
          return ret + item.text.length;
        } else if (item.media) {
          return ret + 200;
        } else {
          return ret;
        }
      }, 0)
    : 0;

  const [more, showMore] = useState(length < 400 || !snippet);

  return items ? (
    <div className={className}>
      <div className={classNames(!more && 'bb-relative bb-max-h-96 bb-overflow-y-hidden')}>
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
        {!more && (
          <div
            className="bb-absolute bb-bottom-0 bb-w-full bb-h-24"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)' }}
          ></div>
        )}
      </div>
      {!more && (
        <div className="bb-text-center bb-p-3">
          <button className="bb-text-blue-500 hover:bb-underline bb-font-medium bb-text-lg" type="button" onClick={() => showMore(true)}>
            Show More
          </button>
        </div>
      )}
    </div>
  ) : null;
}

export default Content;
