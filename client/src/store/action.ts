import { createAction } from '@reduxjs/toolkit';
import { CityOffer, FullOffer, OffersList } from '../types/offer';
import { AuthorizationStatusType } from '../types/authorization-status';
import { Review } from '../types/review';

const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city,
}));

const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
  payload: offers,
}));

const currentOffer = createAction('offers/currentOffer', (offer: FullOffer | null) => ({
  payload: offer,
}));

const reviewsList = createAction('offers/reviewsList', (reviews: Review[]) => ({
  payload: reviews,
}));

const requireAuthorization = createAction<AuthorizationStatusType>(
  'user/requireAuthorization'
);

const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus'
);

const setError = createAction<string | null>('app/setError');

export {
  changeCity,
  offersCityList,
  currentOffer,
  reviewsList,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setError
};