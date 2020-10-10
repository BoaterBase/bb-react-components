import React, { useEffect } from 'react';
import trackHit from '../../utils/trackHit';

/** A page wrapper to apply custom tracking info to analytics */
export default function PageLayout({ path, title, children }) {
  useEffect(() => {
    setTimeout(async () => {
      try {
        await trackHit([], path, title);
      } catch (err) {
        console.error(err);
      }
    }, 100);
  }, [path, title]);

  return children;
}
