import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import user, * as handleUser from 'modules/user';
import shows, * as handleShows from 'modules/shows';
import status, * as handleStatus from 'modules/status';
import tags, * as handleTags from 'modules/tags';
import ui, * as handleUi from 'modules/ui';

import { formatSpacedOutWords } from 'utils/capitalizeWord';
import apiService from './middleware/api-service';

const rootReducer = combineReducers({
  user,
  shows,
  status,
  tags,
  ui,
});

const store = createStore(
  rootReducer,
  applyMiddleware(apiService, logger),
);

export default store;

// ======================= Selectors ================================

// User -------------------------------------------------------------

export const getSignedIn = state => handleUser.getSignedIn(state.user);

// Shows -----------------------------------------------------------

export const getVisibleShows = (state) => {
  const activeStatus = handleStatus.getActiveStatus(state.status);
  const activeTags = handleTags.getTagNames(state.tags, 'active');
  return handleShows.getShowsbyStatus(state.shows, activeStatus, activeTags);
};

export const isListUpdating = (state) => {
  const activeStatus = handleStatus.getActiveStatus(state.status);
  return handleShows.getIsFetchingbyStatus(state.shows, activeStatus);
};

export const getShowIds = (state, listName) => (
  handleShows.getShowIds(state.shows, listName)
);

export const isShowNew = (state, id) => (
  handleShows.getLastAdded(state.shows) === id
);

export const getShowIndexFromAll = (state, id) => (
  handleShows.getShowIndexFromAll(state.shows, id)
);

export const getNumberOfShows = (state, listName) => (
  handleShows.getNumberOfShows(state.shows, listName || handleStatus.getActiveStatus(state.status))
);

export const getShowTags = (state, id) => (
  handleShows.getShowTags(state.shows, id)
);

export const createListCaption = (state) => {
  const activeStatus = formatSpacedOutWords(handleStatus.getActiveStatus(state.status));
  const activeTags = handleTags.getTagNames(state.tags, 'active');
  let tagString;
  if (activeTags.length === 2) {
    tagString = `${activeTags[0]} and ${activeTags[1]}`;
  } else if (activeTags.length > 1) {
    tagString = `${activeTags.slice(0, -1).join(', ')}, and ${activeTags[activeTags.length - 1]}`;
  } else {
    tagString = activeTags;
  }

  if (activeStatus === 'Watch Later') {
    return `${tagString} Shows to ${activeStatus}`;
  }
  if (activeStatus === 'On Hold') {
    return `${tagString} Shows on Hold`;
  }
  return `${activeStatus} ${tagString} Shows`;
};

// Status ----------------------------------------------------------

export const getActiveStatus = state => (
  handleStatus.getActiveStatus(state.status)
);

// Tags ------------------------------------------------------------

export const getSortedTags = (state, ...args) => (
  handleTags.getFullySortedTags(state.tags, ...args)
);

export const getTagNames = (state, listName) => (
  handleTags.getTagNames(state.tags, listName)
);

export const getNumberOfTags = state => (
  handleTags.getNumberOfTags(state.tags)
);

// UI ---------------------------------------------------------------

export const isColumnHidden = (state, name) => (
  handleUi.isColumnHidden(state.ui, name)
);

export const getNumberOfHiddenColumns = state => (
  handleUi.getNumberOfHiddenColumns(state.ui)
);
