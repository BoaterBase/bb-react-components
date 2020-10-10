import qs from 'qs';
import getSessionId from '../data/getSessionId';

/** Track page hit */
export default async function trackHit(ids = [], path, title) {
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
            t: 'pageview',
            ds: 'web',
            dp: path,
            dt: title,
          })
        )
        .join('\n'),
    });
    //console.log(response);
  } catch (err) {
    console.error(err);
  }
}
