import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { FullOffer, OffersList } from '../types/offer';
import { Review } from '../types/review';
import {
  offersCityList,
  currentOffer,
  reviewsList,
  requireAuthorization,
  setUserData,
  setOffersDataLoadingStatus,
  setError
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData, UserData } from '../types/user-data';
import { store } from '../store';

const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<OffersList[]>(APIRoute.Offers);
      dispatch(offersCityList(data));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

const fetchOfferAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    dispatch(currentOffer(data));
  },
);

const fetchReviewsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchReviews',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
    dispatch(reviewsList(data));
  },
);

const addReviewAction = createAsyncThunk<
  void,
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/addReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Reviews}/${offerId}`, { comment, rating });
    dispatch(fetchReviewsAction(offerId));
    dispatch(fetchOfferAction(offerId));
  },
);

const changeFavoriteStatusAction = createAsyncThunk<
  void,
  { offerId: string; status: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/changeFavoriteStatus',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Offers}/favorite/${offerId}/${status}`);
    dispatch(fetchOffersAction());
    dispatch(fetchOfferAction(offerId));
  },
);

const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserData(null));
    }
  },
);

const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
    rejectValue: string;
  }
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
      return data;
    } catch {
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserData(null));
      return rejectWithValue('Login failed');
    }
  },
);

const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
  },
);

const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export {
  fetchOffersAction,
  fetchOfferAction,
  fetchReviewsAction,
  addReviewAction,
  changeFavoriteStatusAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  clearErrorAction
};