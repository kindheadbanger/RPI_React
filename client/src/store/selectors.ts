import { State } from '../types/state';

const getCity = (state: State) => state.city;
const getOffers = (state: State) => state.offers;
const getOffer = (state: State) => state.offer;
const getReviews = (state: State) => state.reviews;
const getAuthorizationStatus = (state: State) => state.authorizationStatus;
const getOffersDataLoadingStatus = (state: State) => state.isOffersDataLoading;
const getError = (state: State) => state.error;

export {
  getCity,
  getOffers,
  getOffer,
  getReviews,
  getAuthorizationStatus,
  getOffersDataLoadingStatus,
  getError
};