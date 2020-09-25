import React from 'react';
import formatCurrency from '../utils/formatCurrency';
import ExternalLink from '../icons/ExternalLink';
import Message from '../icons/Message';
export default function Variants({ items, sendMessage }) {
  return items ? (
    <ul>
      {items.map((item) => (
        <li className="bb-border-t bb-border-gray-100 bb-mb-1 bb-flex bb-pl-1">
          <div>
            <div>
              <span className="bb-text-2xl bb-font-medium bb-text-gray-500 bb-mr-1">{item.amount ? formatCurrency(item.amount, item.currency) : 'POA'}</span>
              <span className="bb-font-medium bb-text-gray-400">{item.label}</span>
            </div>
            <p className="bb-text-xs bb-text-gray-400 bb-font-light">{item.description}</p>
          </div>
          {item.action == 'link' && (
            <a
              href={item.link}
              target="_external"
              className="bb-ml-auto bb-text-orange-500 bb-font-medium bb-flex bb-flex-no-wrap bb-items-center hover:bb-underline"
            >
              <span className="bb-truncate">{item.button}</span> <ExternalLink className="bb-w-4 bb-h-4 bb-ml-1" />
            </a>
          )}
          {item.action == 'contact' && (
            <button
              type="button"
              onClick={sendMessage}
              className="bb-ml-auto bb-text-orange-500 bb-font-medium bb-flex bb-flex-no-wrap bb-items-center focus:bb-outline-none hover:bb-underline"
            >
              <span className="bb-truncate">{item.button}</span> <Message className="bb-w-4 bb-h-4 bb-ml-1" />
            </button>
          )}
        </li>
      ))}
    </ul>
  ) : null;
}
