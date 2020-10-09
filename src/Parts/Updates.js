import React from 'react';
import Markdown from 'markdown-to-jsx';
import Link from '../Link';

/** Create a snippet from a content block */
function Snippet({ content }) {
  return content
    ? content
        .filter(({ kind }) => ['text', 'heading'].includes(kind))
        .map(({ text }, index) => (
          <Markdown
            key={index}
            options={{
              forceInline: true,
            }}
          >
            {text.trim() + '... '}
          </Markdown>
        ))
    : null;
}
export default function Updates({ updates, pathname }) {
  return (
    <div className="bb-space-y-8">
      {updates &&
        updates.map((item, index) => (
          <div key={index} className="bb-grid bb-grid-cols-3 bb-border-t bb-border-gray-100 bb-pt-6">
            <p className="bb-col-span-3 md:bb-col-span-1 bb-mb-2 bb-text-xl md:bb-text-2xl bb-leading-5 bb-text-gray-500 bb-font-thin">
              <time dateTime="2020-03-16">{new Date(item.created).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
            </p>
            <div className="bb-col-span-3 md:bb-col-span-2">
              <h3 className="bb-text-xl bb-leading-7 bb-font-semibold bb-text-gray-900">
                <Link to={`${pathname}/updates/${item.slug}`} className="hover:bb-underline">
                  {item.title}
                </Link>
              </h3>
              <p className="bb-mt-3 bb-text-base bb-leading-6 bb-text-gray-500">
                <Snippet content={item.content} />
              </p>
              <div className="bb-mt-3">
                <Link
                  to={`${pathname}/updates/${item.slug}`}
                  className="hover:bb-underline bb-text-base bb-leading-6 bb-font-semibold bb-text-indigo-600 hover:bb-text-indigo-500 bb-transition bb-ease-in-out bb-duration-150"
                >
                  Read full update
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
