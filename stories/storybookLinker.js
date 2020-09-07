import qs from 'qs';

/** Create a linker to map storybook routes to our links */
function getStorybookPath({ pathname, query }) {
  const paths = pathname.split('/');
  const params = {
    ...query,
    viewMode: 'story',
  };

  // TODO: All the other paths!
  //http://localhost:6006/iframe.html?id=blocks-listing--preview&viewMode=story
  if (paths[1] === 'listings' && paths[2]) {
    if (paths[3] === 'updates') {
      params.id = `blocks-listingupdate--preview`;
      params.listingId = paths[2];
      params.updateId = paths[4];
    } else {
      params.id = `blocks-listing--preview`;
      params.listingId = paths[2];
    }
  }

  return `/iframe.html?` + qs.stringify(params);
}

const linker = {
  changeUrl: (url) => {
    window.location.assign(getStorybookPath(url));
  },
  updateUrl: (url) => {
    window.history.pushState({}, '', getStorybookPath(url));
  },
  createUrl: (url) => {
    return getStorybookPath(url);
  },
};

export default linker;
