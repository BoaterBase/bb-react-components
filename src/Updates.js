import React from 'react';
import { useAsyncData } from '../src/utils';
import Markdown from 'markdown-to-jsx';
import Link from './Link';

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
export default function Updates({ data, pathname }) {
  const [updates, updatesError] = useAsyncData(data);

  if (!updates) return <div>Loading</div>;
  return (
    <div className="bb-grid bb-gap-16 lg:bb-grid-cols-2 lg:bb-col-gap-5 lg:bb-row-gap-12">
      {updates.docs
        .filter((d) => d.content && d.title && d.created)
        .map((item, index) => (
          <div key={index}>
            <p className="bb-text-sm bb-leading-5 bb-text-gray-500">
              <time dateTime="2020-03-16">{new Date(item.created).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
            </p>
            <a href="#" className="bb-block">
              <h3 className="bb-mt-2 bb-text-xl bb-leading-7 bb-font-semibold bb-text-gray-900">{item.title}</h3>
              <p className="bb-mt-3 bb-text-base bb-leading-6 bb-text-gray-500">
                <Snippet content={item.content} />
              </p>
            </a>
            <div className="bb-mt-3">
              <Link
                to={`${pathname}/updates/${item.slug}`}
                className="bb-text-base bb-leading-6 bb-font-semibold bb-text-indigo-600 hover:bb-text-indigo-500 bb-transition bb-ease-in-out bb-duration-150"
              >
                Read full update
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
