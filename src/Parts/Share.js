import React from 'react';
import classNames from 'classnames';
import Facebook from '../icons/Facebook';
import Twitter from '../icons/Twitter';
import Pinterest from '../icons/Pinterest';
import Linkedin from '../icons/Linkedin';
import Email from '../icons/Email';
import Hypershare from '../icons/Hypershare';
import BoaterBoard from '../icons/BoaterBoard';

import Copy from '../icons/Copy';
import { useAlerts } from '../Alerts';
import qs from 'qs';
import { useBoaterBase } from '../BoaterBase';

function Share({ pathname, query, title, summary, image, category }) {
  const createAlert = useAlerts();

  const { linker } = useBoaterBase();
  const permalink = linker.createPermalink({ pathname, query });
  const onload = `t=this;window.addEventListener('message',function (m){m.data.bbHeight && t.style.setProperty('height', m.data.bbHeight)}, false)`;
  const embed = `<iframe onload="${onload}" src="${linker.createEmbed({
    pathname,
    query,
  })}" loading="lazy" style="border:0;display:block;width:100%;height:300px;"><a href="${permalink}">${title}</a></iframe>`;

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

    category && {
      id: 'boaterboard',
      Icon: BoaterBoard,
      title: 'BoaterBoard',
      link: `https://www.boaterboard.com/create?${qs.stringify({
        link: permalink,
        title: title,
        description: summary,
        category: category,
        imageUrl: image,
      })}`,
      color: 'bb-bg-teal-500',
    },

    {
      id: 'share',
      Icon: Hypershare,
      title: 'Hypershare',
      link: `https://hypershare.xyz/${encodeURIComponent(permalink)}?${qs.stringify({
        t: title,
      })}`,
      color: 'bb-bg-pink-400',
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
  ].filter(Boolean);

  function onCopyLinkClick() {
    try {
      navigator.clipboard.writeText(permalink);
      createAlert('Copied to clipboard.', 'success');
    } catch (err) {
      createAlert('Could not copy to clipboard, try selecting the text.', 'error');
    }
  }

  function onCopyEmbedClick() {
    try {
      navigator.clipboard.writeText(embed);
      createAlert('Copied to clipboard.', 'success');
    } catch (err) {
      createAlert('Could not copy to clipboard, try selecting the text.', 'error');
    }
  }

  return (
    <div>
      <h3 className="bb-uppercase bb-text-center bb-font-medium bb-text-gray-500 bb-text-sm">Share</h3>
      <div className="bb-flex bb-flex-wrap bb-space-x-1 bb-justify-center bb-my-2">
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
          type="text"
          value={permalink}
          readOnly
          className="bb-rounded-md bb-block bb-w-full bb-pr-10 bb-border-gray-300 bb-bg-gray-200 bb-text-gray-500 bb-font-mono bb-text-xs bb-leading-5"
          placeholder="000-00-0000"
        />
        <button
          onClick={onCopyLinkClick}
          className="bb-absolute bb-inset-y-0 bb-right-0 bb-px-2 bb-flex bb-items-center bb-rounded bb-border bb-border-transparent focus:bb-outline-none focus:bb-border-indigo-300 focus:bb-shadow-outline-indigo active:bb-bg-indigo-200 bb-transition bb-ease-in-out bb-duration-150"
        >
          <Copy className="bb-h-4 bb-w-4 bb-text-gray-400" />
        </button>
      </div>
      <h3 className="bb-uppercase bb-text-center bb-font-medium bb-text-gray-500 bb-text-sm bb-mt-2">Embed</h3>
      <div className="bb-mt-1 bb-relative bb-rounded-md bb-shadow-sm">
        <textarea
          type="text"
          value={embed}
          readOnly
          className="bb-rounded-md bb-block bb-w-full bb-pr-10 bb-border-gray-300 bb-bg-gray-200 bb-text-gray-500 bb-font-mono bb-text-xs bb-leading-5"
          placeholder="000-00-0000"
        />
        <button
          onClick={onCopyEmbedClick}
          className="bb-absolute bb-top-0 bb-right-0 bb-py-2 bb-px-2 bb-flex bb-items-center bb-rounded bb-border bb-border-transparent focus:bb-outline-none focus:bb-border-indigo-300 focus:bb-shadow-outline-indigo active:bb-bg-indigo-200 bb-transition bb-ease-in-out bb-duration-150"
        >
          <Copy className="bb-h-4 bb-w-4 bb-text-gray-400" />
        </button>
      </div>
    </div>
  );
}
export default Share;
