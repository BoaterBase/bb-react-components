import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import Gallery from './Gallery';
import classNames from 'classnames';
import Microlink from '@microlink/react';
import ListingsSection from '../sections/ListingsSection';
import ProfileUpdatesSection from '../sections/ProfileUpdatesSection';
import ListingUpdatesSection from '../sections/ListingUpdatesSection';

import qs from 'qs';
import Link from '../Link';

const H2 = (props) => <h2 {...props} />;
const H3 = (props) => <h3 {...props} />;
const H4 = (props) => <h4 {...props} />;
const B = (props) => <b {...props} />;
const P = (props) => <p {...props} />;

function Content({ items, className, snippet, defaultProfileId }) {
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
              if (item.link && item.action)
                return (
                  <div key={index} className="bb-mt-4 bb-mb-5 bb-flex bb-items-center bb-flex-nowrap">
                    <h2 className="bb-leading-8 bb-font-medium bb-tracking-tight bb-text-gray-600 bb-text-xl sm:bb-text-2xl sm:bb-leading-10">{item.text}</h2>
                    <span className="bb-flex-auto"></span>
                    <Link to={item.link} className="bb-font-medium bb-text-blue-500">
                      {item.action} →
                    </Link>
                  </div>
                );
              else
                return (
                  <div key={index} className="bb-mt-4 bb-mb-5 bb-flex bb-items-center bb-flex-nowrap">
                    <span className="bb-flex-auto bb-border-t-2 bb-border-gray-100"></span>
                    <h2 className="bb-mx-4 bb-text-center bb-leading-8 bb-font-medium bb-tracking-tight bb-text-gray-600 bb-text-xl sm:bb-text-2xl sm:bb-leading-10">
                      {item.link ? <Link to={item.link}>{item.text}</Link> : item.text}
                    </h2>
                    <span className="bb-flex-auto bb-border-t-2 bb-border-gray-100"></span>
                  </div>
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
                        Embed: {
                          component: Microlink,
                          props: {
                            lazy: true,
                            size: 'large',
                            className: 'bb-rounded-sm bb-shadow-sm bb-overflow:hidden bb-mx-auto bb-my-4',
                            media: ['video', 'image', 'logo'],
                            style: {
                              width: '100%',
                            },
                          },
                        },
                      },
                    }}
                  >
                    {item.text.replace(/^((http|https):\/\/\S+)$/gm, '<Embed url="$1" />')}
                  </Markdown>
                </div>
              );
            case 'embed':
              if (item.link.startsWith('https://www.boaterbase.com/listings?')) {
                //const searchState = { layout: 'card', configure: { hitsPerPage: 12 }, refinementList: { 'specifications.condition': ['New'] } };
                const searchState = qs.parse(item.link.split('?')[1], {
                  decoder(str, decoder, charset) {
                    const keywords = {
                      true: true,
                      false: false,
                      null: null,
                      undefined,
                    };
                    if (str in keywords) {
                      return keywords[str];
                    }
                    return decoder(str, decoder, charset);
                  },
                });
                return <ListingsSection key={index} defaultProfileId={defaultProfileId} searchState={searchState} />;
              }
              if (item.link.startsWith('https://www.boaterbase.com/listings/') && item.link.endsWith('/updates')) {
                const listingSlug = item.link.split('/')[4];
                return <ListingUpdatesSection key={index} id={listingSlug} slug={listingSlug} limit={3} />;
              }
              if (item.link.startsWith('https://www.boaterbase.com/profiles/') && item.link.endsWith('/updates')) {
                const profileHandle = item.link.split('/')[4];
                return <ProfileUpdatesSection key={index} id={profileHandle} slug={profileHandle} limit={3} />;
              }
              return (
                <Microlink
                  key={index}
                  url={item.link}
                  size={item.size}
                  lazy={true}
                  className="bb-rounded-sm bb-shadow-sm bb-overflow:hidden bb-mx-auto bb-my-4"
                  media={['video', 'image', 'logo']}
                  style={{
                    width: '100%',
                  }}
                />
              );
            case 'media':
              return (
                <div key={index} className="bb-my-3">
                  <Gallery key={index} media={item.items} layout={item.display} />
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
