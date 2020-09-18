import React from 'react';
import classNames from 'classnames';
import Facebook from '../icons/Facebook';
import Twitter from '../icons/Twitter';
import Pinterest from '../icons/Pinterest';
import Linkedin from '../icons/Linkedin';
import Email from '../icons/Email';
import Copy from '../icons/Copy';
import { useAlerts } from '../Alerts';
import qs from 'qs';
import { useBoaterBase } from '../BoaterBase';

function Share({ pathname, query, title, summary }) {
  const { createAlert } = useAlerts();

  const { linker } = useBoaterBase();
  const permalink = linker.createPermalink({ pathname, query });

  const shares = [
    {
      id: 'facebook',
      Icon: Facebook,
      title: 'Facebook',
      link: `https://www.facebook.com/sharer/sharer.php?${qs.stringify({
        u: permalink,
      })}`,
      color: 'bb-bg-blue-500',
    },
    {
      id: 'twitter',
      Icon: Twitter,
      title: 'Twitter',
      link: `https://twitter.com/intent/tweet?${qs.stringify({
        text: `${title} - ${permalink}`,
      })}`,
      color: 'bb-bg-blue-400',
    },
    {
      id: 'pinterest',
      Icon: Pinterest,
      title: 'Pinterest',
      link: `http://pinterest.com/pin/create/link/?${qs.stringify({
        url: permalink,
        description: title,
      })}`,
      color: 'bb-bg-red-600',
    },
    {
      id: 'linkedin',
      Icon: Linkedin,
      title: 'LinkedIn',
      link: `https://www.linkedin.com/shareArticle?${qs.stringify({
        mini: true,
        url: permalink,
        title: title,
        summary: summary,
      })}`,
      color: 'bb-bg-blue-600',
    },
    {
      id: 'email',
      Icon: Email,
      title: 'Email',
      link: `mailto:?${qs.stringify({
        subject: title,
        body: `Checkout this link: ${permalink}`,
      })}`,
      color: 'bb-bg-gray-400',
    },
  ];

  function onCopyLinkClick() {
    try {
      navigator.clipboard.writeText(permalink);
      createAlert('Copied to clipboard.', 'success');
    } catch (err) {
      createAlert('Could not copy to clipboard, try selecting the text.', 'error');
    }
  }

  return (
    <div>
      <h3 className="bb-uppercase bb-text-center bb-font-medium bb-text-gray-500 bb-text-sm">Share</h3>
      <div className="bb-flex bb-space-x-1 bb-justify-center bb-my-2">
        {shares.map(({ Icon, title, link, color, id }) => (
          <a
            key={id}
            target="_share"
            href={link}
            title={title}
            className={classNames(
              'bb-p-2 bb-rounded-full bb-block bb-text-white bb-transition bb-duration-500 bb-ease-in-out bb-transform hover:bb--translate-y-0.5 hover:bb-scale-105',
              color
            )}
          >
            <Icon className="bb-w-6 bb-h-6 bb-opacity-75" />
          </a>
        ))}
      </div>
      <div className="bb-mt-1 bb-relative bb-rounded-md bb-shadow-sm">
        <input
          value={permalink}
          readOnly
          className="bb-form-input bb-block bb-w-full bb-pr-10 bb-bg-gray-200 bb-text-gray-500 bb-font-mono bb-text-xs bb-leading-5"
          placeholder="000-00-0000"
        />
        <button
          onClick={onCopyLinkClick}
          className="bb-absolute bb-inset-y-0 bb-right-0 bb-px-2 bb-flex bb-items-center bb-rounded bb-border bb-border-transparent focus:bb-outline-none focus:bb-border-indigo-300 focus:bb-shadow-outline-indigo active:bb-bg-indigo-200 bb-transition bb-ease-in-out bb-duration-150"
        >
          <Copy className="bb-h-4 bb-w-4 bb-text-gray-400" />
        </button>
      </div>
    </div>
  );
}
export default Share;
