import qs from 'qs';
import getSessionId from '../data/getSessionId';

/** Track page hit
 *
 * e.g. trackEvent([],'Message','Sent',`/listings/${id}`)
 */
export default async function trackEvent(ids = [], category, action, label, value) {
  try {
    // Merge ids with ours
    const tids = ['UA-67806188-1', ...ids];
    const cid = getSessionId();

    //https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide
    const response = await fetch('https://www.google-analytics.com/batch', {
      method: 'POST',
      body: tids
        .map((tid) =>
          qs.stringify({
            v: 1,
            tid: tid,
            cid: cid,
            aip: 1,
            t: 'event',
            ec: category,
            ea: action,
            el: label,
            ev: value,
          })
        )
        .join('\n'),
    });
    //console.log(response);
  } catch (err) {
    console.error(err);
  }
}
