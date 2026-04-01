import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import MainPage from '../pages/main-page/main-page';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../const';
import { makeFakeOffer, makeFakeUser } from './mocks';

vi.mock('../components/map/map', () => ({
  Map: () => <div data-testid="map">Map</div>,
}));

vi.mock('../components/cities-card-list/cities-card-list', () => ({
  CitiesCardList: () => <div data-testid="cities-card-list">CitiesCardList</div>,
}));

vi.mock('../components/cities-list/cities-list', () => ({
  CitiesList: () => <div data-testid="cities-list">CitiesList</div>,
}));

vi.mock('../components/sort-options/sort-options', () => ({
  SortOptions: () => <div data-testid="sort-options">SortOptions</div>,
}));

describe('MainPage header — неавторизованный пользователь', () => {
  it('отображает ссылку Sign in', () => {
    renderWithProviders(<MainPage />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('не отображает Sign out', () => {
    renderWithProviders(<MainPage />);
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });
});

describe('MainPage header — авторизованный пользователь', () => {
  it('отображает email пользователя', () => {
    const fakeUser = makeFakeUser();

    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
      },
    });

    expect(screen.getByText(fakeUser.email)).toBeInTheDocument();
  });

  it('отображает кнопку Sign out', () => {
    const fakeUser = makeFakeUser();

    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
      },
    });

    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('отображает количество избранных предложений', () => {
    const fakeUser = makeFakeUser();
    const favoriteOffer = { ...makeFakeOffer(), isFavorite: true };
    const favoriteOfferSecond = { ...makeFakeOffer(), isFavorite: true };
    const ordinaryOffer = { ...makeFakeOffer(), isFavorite: false };

    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUser,
        offers: [favoriteOffer, favoriteOfferSecond, ordinaryOffer],
      },
    });

    expect(screen.getByText('2')).toBeInTheDocument();
  });
});