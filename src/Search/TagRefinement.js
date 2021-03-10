import { createConnector } from 'react-instantsearch-dom';

const connectTag = createConnector({
  displayName: 'TagList',
  getProvidedProps(props, searchState) {
    // Since the `tagList` searchState entry isn't
    // necessarily defined, we need to default its value.
    const currentRefinement = searchState.tagList || '';

    // Connect the underlying component with the `currentRefinement`
    return { currentRefinement };
  },
  refine(props, searchState, nextRefinement) {
    // When the underlying component calls its `refine` prop,
    // we update the searchState with the provided refinement.
    return {
      // `searchState` represents the search state of *all* widgets. We need to extend it
      // instead of replacing it, otherwise other widgets will lose their respective state.
      ...searchState,
      tagList: nextRefinement,
    };
  },
  getSearchParameters(searchParameters, props, searchState) {
    // When the `tagList` state entry changes, we update the query
    return searchParameters.addTagRefinement(searchState.tagList || '');
    //return searchParameters.setQuery(searchState.tagList || '');
  },
  cleanUp(props, searchState) {
    // When the widget is unmounted, we omit the entry `tagList`
    // from the `searchState`, then on the next request the query will
    // be empty
    const { tagList, ...nextSearchState } = searchState;

    return nextSearchState;
  },
});

const TagListBox = ({ currentRefinement, refine }) => (
  <div className="bb-flex-auto bb-px-1 bb-mr-1 bb-mb-1">
    <h3 className="bb-uppercase bb-text-center bb-mt-2 bb-mb-1 bb-font-medium bb-text-gray-500 bb-text-sm">Tags</h3>

    <input
      className="bb-rounded-md bb-border-gray-300 bb-py-0.5 bb-px-2 bb-w-full bb-mb-1 bb-text-base bb-placeholder-gray-400"
      type="text"
      placeholder="e.g. featured, offer"
      value={currentRefinement}
      onChange={(e) => refine(e.currentTarget.value)}
    />
  </div>
);

export { connectTag };
export default connectTag(TagListBox);
