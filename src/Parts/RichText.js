import React from 'react';
import Markdown from 'markdown-to-jsx';

const H2 = (props) => <h2 {...props} className="bb-text-2xl md:bb-text-4xl bb-font-bold" />;
const H3 = (props) => <h3 {...props} className="bb-text-xl md:bb-text-3xl bb-font-bold" />;
const H4 = (props) => <h4 {...props} />;
const B = (props) => <b {...props} />;
const P = (props) => <p {...props} />;

export default function RichText({ text }) {
  return (
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
      {text}
    </Markdown>
  );
}
