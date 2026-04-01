import { createReducer } from '@reduxjs/toolkit';
import { getCity } from '../utils';
import {
  changeCity,
  offersCityList,
  currentOffer,
  reviewsList,
  requireAuthorization,
  setUserData,
  setOffersDataLoadingStatus,
  setError
} from './action';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import { CityOffer, FullOffer, OffersList } from '../types/offer';
import { AuthorizationStatusType } from '../types/authorization-status';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';

type InitialState = {
  city: CityOffer;
  offers: OffersList[];
  offer: FullOffer | null;
  reviews: Review[];
  authorizationStatus: AuthorizationStatusType;
  user: UserData | null;
  isOffersDataLoading: boolean;
  error: string | null;
};

const defaultCity = getCity('Paris', CITIES_LOCATION);

const initialState: InitialState = {
  city: defaultCity,
  offers: [],
  offer: null,
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  isOffersDataLoading: true,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(currentOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(reviewsList, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };